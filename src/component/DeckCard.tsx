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
import { SpecialMoveDeckDto } from '../types';

interface DeckCardProps {
    data: SpecialMoveDeckDto;
    setDeckData: React.Dispatch<React.SetStateAction<SpecialMoveDeckDto[]>>;
}

const DeckCard: React.FC<DeckCardProps> = ({ data, setDeckData }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const deleteToDeck = async () => {
        try {
            const apiUrl = 'https://original-specialmove.onrender.com/put-specialmove-deck';
            const formData = new FormData();
            formData.append('deckId', data.deckId.toString());

            const response = await fetch(apiUrl, {
                method: "POST",
                body: formData
            });

            if (response.status !== 200) {
                throw new Error('デッキ削除に失敗しました。');
            }
            setDeckData(prevDeckData => prevDeckData.filter(deck => deck.id !== data.id));
        } catch (error) {
            console.error("デッキ削除に失敗しました:", error);
        }
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
                        <Button variant="outlined" sx={{ mt: 2, ml: 2 }} onClick={deleteToDeck}>
                            デッキ削除
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
                </Box>
            </Dialog>
        </Box>
    );
};

export default DeckCard;