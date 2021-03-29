import React, { FC, useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Names } from '..';

export type Winner = 1 | -1 | 0;
export interface GameBoardProps extends Names {
    onCompleted: (winner: Winner) => void;
}

const GameBoard: FC<GameBoardProps> = ({name1, name2, onCompleted}) =>{
    const classes = useStyles();
    
    const [currPlayer, setCurrPlayer] = useState<number>(1);

    const [gameState, setGameState] = useState<number[][]>([
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ]);

    const handleGridClick = (x: number, y: number) => {
        
        setGameState(s => {
            let updatedState = [...s];
            updatedState[x][y] = currPlayer;
            return updatedState;
        });
        setCurrPlayer(cp => cp === 1 ? 2 : 1);
    }

    useEffect(() => {
        const winner = findWinner(gameState);
        if (winner === -1) {
            if(isGameCompleted(gameState))
                onCompleted(-1);
        } else onCompleted(winner)
    }, [gameState]);

    return (
        <Box width={400} textAlign={'center'} >
            <Typography> { currPlayer === 1 ? '*' :'' } { name1} X</Typography>
            <Typography>{currPlayer === 2 ? '*' : ''}{name2} O</Typography>

            <Grid container className={classes.gridContainer} >
{
          
                    
                    gameState.map((gs2, i1) => {
                        return gs2.map((item, i2) => {
                            return (
                                <Grid onClick={e => handleGridClick(i1, i2)} className={classes.gridItem} item key={i1 + i2} md={4}>
                                    {
                                        item === -1 ? '' : item === 1 ? 'X' : 'O'
                                    }
                                </Grid>
                            )
                        })
                    })
                    
            }
            </Grid>
            
            

        </Box>
    )
}

const useStyles = makeStyles<Theme>((theme) => {
    return (createStyles({
        gridContainer: {
            width: 150,
            height: 150
        },
        gridItem: {
            border: '1px Solid',
            height: 50,
            width: 50
}
    }))
})

export default GameBoard

const findWinner = (gs: number[][]):Winner => {


    let winner = -1;

    // Checking row wise
    for (let i = 0; i < 3; i++){
        let x = gs[i][0];
        if (x === -1) continue;
        winner = x;
        let j = 0;
        // Checking rows
        for (; j < 3; j++){
            if (gs[i][j] !== x) {
                winner = -1;
                break;
            };
        }
        if (j === 3) {
            return winner as any;
        }
        else j = 0;
    }

    // Checking column wise
    for (let i = 0; i < 3; i++){
        let x = gs[0][i];
        if (x === -1) continue;
        winner = x;
        let j = 0;

        // Checking rows
        for (; j < 3; j++){
            if (gs[j][i] !== x) {
                winner = -1;
                break;
            };
        }
        if (j === 3) {
            return winner as any;
        }
        else j = 0;
    }

    // Checking left diagonal wise

    winner = gs[0][0];
    for (let i = 0; i <= 3; i++){

        if (i === 3) return winner as any;

        if (gs[i][i] !== winner) {
            winner = -1;
            break;
        };
    }

    // Checking right diagonal wise
    winner = gs[0][2];
    for (let i = 0; i <= 3; i++){

        if (i === 3) return winner as any;

        if (gs[i][2 - i] !== winner) {
            winner = -1;
            break;
        };
    }


    return winner as any;
}

const isGameCompleted = (gs: number[][]): boolean => {
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if(gs[i][j] === -1) return false
        }
    }
    return true;
}