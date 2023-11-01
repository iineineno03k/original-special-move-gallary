import React, { useState } from 'react';
import {
    Card,
    CardMedia,
    Typography,
    Button,
    Dialog,
    Box,
    CardContent,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SpecialMoveDeckDto, SpecialMoveDto } from '../types';

interface Props {
    data: SpecialMoveDto;
    deckData: SpecialMoveDeckDto[];
    setDeckData: React.Dispatch<React.SetStateAction<SpecialMoveDeckDto[]>>;
    idToken: string
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SpecialMoveCard: React.FC<Props> = ({ data, deckData, setDeckData, idToken, setLoading }) => {
    const [open, setOpen] = useState(false);
    const isDataInDeck = deckData.some(deck => deck.id === data.id);
    const winPercentage = data.battleCount === 0 ? "NoData" : Math.round((data.winCount / data.battleCount) * 100) + "%";

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const addToDeck = async () => {
        if (deckData.length >= 5) {
            alert("デッキの数が5以上なので、新しいデッキを追加できません。");
            return;
        }
        setLoading(true);


        try {
            const apiUrl = 'https://original-specialmove.onrender.com/post-specialmove-deck';
            const requestData = {
                idToken: idToken,
                sp: data
            };
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const responseData: SpecialMoveDeckDto = await response.json();

            setDeckData(prevDeckData => [...prevDeckData, responseData]);
        } catch (error) {
            console.error("デッキ登録に失敗しました:", error);
        }
        setLoading(false);
    };

    return (
        <Box flexDirection="column" alignItems="start">
            <Card sx={{ mb: 2 }}>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <CardMedia
                        component="img"
                        sx={{
                            width: 150,
                            height: 150,
                            objectFit: 'cover'
                        }}
                        image={data.imageName}
                        alt={data.spName}
                    />

                    <CardContent>
                        <Typography variant="caption" display="block">
                            {data.furigana}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {data.spName}
                        </Typography>
                        <Button variant="outlined" sx={{ mt: 2 }} onClick={handleOpen}>
                            詳細
                        </Button>
                        <Button variant="outlined" sx={{ mt: 2 }} onClick={addToDeck}
                            disabled={isDataInDeck}>
                            デッキ登録
                        </Button>
                    </CardContent>
                </Box>
                <Typography textAlign={"center"} variant="h6" component="div" sx={{ ml: 2 }}>
                    {data.heading}
                </Typography>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen
            >
                <IconButton
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'white',
                    }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                <Box sx={{ p: 2, overflowY: 'auto' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: '100%', objectFit: 'cover' }}
                        image={data.imageName}
                        alt={data.spName}
                    />
                    <Typography textAlign={"center"} variant="caption" display="block" sx={{ mt: 2 }}>
                        {data.furigana}
                    </Typography>
                    <Typography textAlign={"center"} variant="h5" component="div" sx={{ mt: 1 }}>
                        {data.spName}
                    </Typography>
                    <Typography textAlign={"center"} variant="h6" component="div" sx={{ mt: 2 }}>
                        {data.heading}
                    </Typography>
                    <Typography variant="body1" style={{ whiteSpace: 'pre-line' }} sx={{ mt: 2 }}>
                        {data.description}
                    </Typography>
                    <Typography textAlign={"right"} variant="body1" sx={{ mt: 2 }}>
                        {data.winCount}勝{data.loseCount}敗
                    </Typography>
                    <Typography textAlign={"right"} variant="body1" sx={{ mt: 2 }}>
                        勝率: {winPercentage}
                    </Typography>
                </Box>
            </Dialog>
        </Box>
    );
};


export default SpecialMoveCard;