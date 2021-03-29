import React, { FC, useState } from 'react'
import { Box, Button, TextField, Typography } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export interface Names {
    name1: string;
    name2: string;
}
export interface LandingProps {
    onSubmit: (names: Names) => void;
}

const Landing: FC<LandingProps> = (props) =>{
    const classes = useStyles(); 

    const [names, setNames] = useState<Names>({ name1: '', name2: '' });

    const handleSubmit = () => {
        props.onSubmit(names);
    }

    return (
        <Box>
            <Typography>Enter names of the players</Typography>
            <TextField
                label={'Player 1'}
                value={names.name1}
                onChange={e => setNames(n => ({ ...n, name1: e.target.value }))}
            />
            <TextField
                label={'Player 2'}
                value={names.name2}
                onChange={e => setNames(n => ({ ...n, name2: e.target.value }))}
            />
            <Button onClick={handleSubmit} >
                START GAME
            </Button>
        </Box>
    )
}

const useStyles = makeStyles<Theme>((theme) => {
    return (createStyles({

    }))
})

export default Landing