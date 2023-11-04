import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import SpecialMoveCard from "./component/SpecialMoveCard";
import { Tabs, Tab, Box } from '@mui/material';
import { TailSpin } from 'react-loader-spinner';
import { SpecialMoveDeckDto, SpecialMoveDto } from "./types";
import DeckCard from "./component/DeckCard";

function App() {
  const [data, setData] = useState<SpecialMoveDto[]>([]);
  const [deckData, setDeckData] = useState<SpecialMoveDeckDto[]>([]);
  const [idToken, setIdToken] = useState('');
  const [myId, setMyId] = useState('fuga');
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredData = data.filter(item => {
    if (tabValue === 0) {
      return item.userId === myId;
    } else {
      return item.userId !== myId;
    }
  });

  useEffect(() => {
    // liff関連のlocalStorageのキーのリストを取得
    const getLiffLocalStorageKeys = (prefix: string) => {
      const keys = []
      for (var i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.indexOf(prefix) === 0) {
          keys.push(key)
        }
      }
      return keys
    }
    // 期限切れのIDTokenをクリアする
    const clearExpiredIdToken = (liffId: any) => {
      const keyPrefix = `LIFF_STORE:${liffId}:`
      const key = keyPrefix + 'decodedIDToken'
      const decodedIDTokenString = localStorage.getItem(key)
      if (!decodedIDTokenString) {
        return
      }
      const decodedIDToken = JSON.parse(decodedIDTokenString)
      // 有効期限をチェック
      if (new Date().getTime() > decodedIDToken.exp * 1000) {
        const keys = getLiffLocalStorageKeys(keyPrefix)
        keys.forEach(function (key) {
          localStorage.removeItem(key)
        })
      }
    }
    const initializeLiff = async (id: string) => {
      // clearExpiredIdToken(id);
      // await liff.init({ liffId: id });

      // if (!liff.isLoggedIn()) {
      //   liff.login();
      //   return; // ここでログインする場合、以降の処理は中断
      // }

      // const token = liff.getIDToken();
      // setIdToken(token);

      // try {
      //   const profile = await liff.getProfile();
      //   setMyId(profile.userId);
      // } catch (err) {
      //   console.log("error", err);
      // }

      // fetch のリクエスト
      const token = "hoge";
      const apiUrl = 'http://localhost:8080/get-specialmove';
      const deckUrl = 'http://localhost:8080/get-specialmove-deck';
      const formData = new FormData();
      formData.append('idToken', token);  // ローカル変数を直接使用

      try {
        const response = await fetch(apiUrl, { method: 'POST', body: formData });
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('必殺技取得エラー:', error);
        setLoading(false);
      }

      try {
        const deckResponse = await fetch(deckUrl, { method: 'POST', body: formData });
        const deckData = await deckResponse.json();
        setDeckData(deckData);
        setLoading(false);
      } catch (error) {
        console.error('デッキ取得エラー:', error);
        setLoading(false);
      }
    };

    initializeLiff('2001116233-1lQeLOv3');
  }, []);

  return (
    <div>
      {loading && (
        <div className="overlay">
          <TailSpin
            height={80}
            width={80}
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius={1}
            visible={true}
          />
        </div>
      )}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="My必殺技" />
          <Tab label="取得した必殺技" />
          <Tab label="Myデッキ" />
        </Tabs>
      </Box>

      {!loading && (
        <>
          {tabValue === 0 ? (
            filteredData.length > 0 ? (
              filteredData.map((sp) => (
                <SpecialMoveCard key={sp.id} data={sp} deckData={deckData} setDeckData={setDeckData} idToken={idToken} />
              ))
            ) : (
              <p>フォームから必殺技を作ろう</p>
            )
          ) : tabValue === 1 ? (
            filteredData.length > 0 ? (
              filteredData.map((sp) => (
                <SpecialMoveCard key={sp.id} data={sp} deckData={deckData} setDeckData={setDeckData} idToken={idToken} />
              ))
            ) : (
              <p>オンライン対戦でお気に入り必殺技を見つけよう</p>
            )
          ) : deckData.length > 0 ? (
            deckData.map((deck) => <DeckCard key={deck.id} data={deck} setDeckData={setDeckData} />)
          ) : (
            <p>デッキ登録をしよう</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;
