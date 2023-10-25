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

interface Props {
    data: SpecialMoveDto;
}

const SpecialMoveCard: React.FC<Props> = ({ data }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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


export default SpecialMoveCard;