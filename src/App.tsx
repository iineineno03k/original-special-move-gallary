import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import SpecialMoveCard from "./component/SpecialMoveCard";
import { Tabs, Tab, Box } from '@mui/material';

interface SpecialMoveDto {
  id: number;
  userId: string;
  spName: string;
  furigana: string;
  heading: string;
  description: string;
  imageName: string;
  registedTime: string;
  battleCount: number;
  winCount: number;
  loseCount: number;
}

function App() {
  const [data, setData] = useState<SpecialMoveDto[]>([]);
  const [idToken, setIdToken] = useState('');
  const [myId, setMyId] = useState('');
  const [tabValue, setTabValue] = useState(0);

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
    const initializeLiff = async (id) => {
      clearExpiredIdToken(id)
      await liff.init({ liffId: id })
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        const token = liff.getIDToken()
        setIdToken(token);
      }
    }
    initializeLiff('2001116233-1lQeLOv3');
    liff
      .getProfile()
      .then((profile) => {
        setMyId(profile.userId);
      })
      .catch((err) => {
        console.log("error", err);
      });

    const apiUrl = 'https://original-specialmove.onrender.com/get-specialmove';
    const formData = new FormData();
    formData.append('idToken', idToken);
    const requestOptions = {
      method: 'POST',
      body: formData
    };

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('API呼び出しエラー:', error);
      });
  }, []);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="My必殺技" />
          <Tab label="取得した必殺技" />
        </Tabs>
      </Box>
      {filteredData.length > 0 ? (
        filteredData.map((sp) => (
          <SpecialMoveCard key={sp.id} data={sp} />
        ))
      ) : (
        <p>表示するものがありません。必殺技登録やバトル画面に促します。</p>
      )}
    </div>
  );
}

export default App;
