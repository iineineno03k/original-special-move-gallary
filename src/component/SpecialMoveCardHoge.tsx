import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Button, Modal, Typography, Box, IconButton, Grid } from '@mui/material';
import { Info, Close } from '@mui/icons-material';

const SpecialMoveCard = ({ specialMove, opponent }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const imageStyle = {
        width: '200px',
        height: '200px',
        objectFit: 'cover', // 画像を正方形に調整
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Card>
                    <CardMedia
                        component="img"
                        alt={specialMove.name}
                        sx={imageStyle}
                        image={specialMove.imageName}
                    />
                    <CardContent>
                        <Typography variant="h5">{specialMove.spName}</Typography>
                        <Typography variant="subtitle1">{specialMove.heading}</Typography>
                        <Button variant="outlined" onClick={handleOpen}>詳細</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card>
                    <CardMedia
                        component="img"
                        alt={opponent.name}
                        sx={imageStyle}
                        image={opponent.image}
                    />
                    <CardContent>
                        <Typography variant="h5">{opponent.spName}</Typography>
                        <Typography variant="subtitle1">{opponent.heading}</Typography>
                        <Button variant="outlined" onClick={handleOpen}>詳細</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, width: 400 }}>
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        詳細情報
                    </Typography>
                    <Typography variant="body2">{specialMove.description}</Typography>
                    <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
                        <Close />
                    </IconButton>
                </Box>
            </Modal>
            <Box sx={{ textAlign: 'center', fontSize: 30, mt: 2 }}>VS</Box>
        </Grid>
    );
};

export default SpecialMoveCard;
