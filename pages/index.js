// FUNCTIONAL
import useVillagers from '../hooks/useVillagers'
import { TwitterShareButton } from 'react-twitter-embed'

// DESIGN
import { CssBaseline, Container, Box, Button, Typography } from '@material-ui/core'
import { spacing } from '@material-ui/system'
import { CheckCircleOutline, HighlightOff } from '@material-ui/icons'

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// COMPONENTS
import ResultDetails from '../components/ResultDetails'
import NextVillagerButton from '../components/NextVillagerButton'
import GitHubButton from '../components/GitHubButton'
import NoIcon from '../components/NoIcon'
import theme from '../src/theme'
import PageHead from '../components/Head'


const Index = () => {
    let {
        villagers,
        villagerImage,
        villagerInfo,
        guess,
        loading,
        score,
        count,
        nextChallenge,
        submitGuess,
        clearScore
    } = useVillagers()
    
    return (
        <MuiThemeProvider theme={theme}>
            <style jsx>{`
                img {
                    max-height: 30vh;
                    height: 30vh;
                    display: block;
                    margin: 16px auto;
                }
            `}</style>
            <PageHead></PageHead>
            <CssBaseline />

            <Container maxWidth='sm' mx="auto">
            <Box 
                bgcolor="white" 
                my={2} 
                p={3} 
                borderRadius={16} 
                textAlign="center"
            >
                <Typography 
                    variant='h1'
                >
                    Guess the Villager
                </Typography>
                <Typography variant='h4' component='p'>
                    { score } / { count }
                </Typography>
                { loading && <Box m={3}>Loading...</Box> }
                { !loading && <>
                
                    <Box>
                        <img src={ villagerImage } />
                        <ResultDetails 
                            villagerInfo={ villagerInfo }
                            showResult={ guess !== '' }
                        ></ResultDetails>
                    </Box>

                    <Box>
                    {
                        villagers.map(villager => (
                            <Box 
                                key={ villager }
                                my={2}
                            >
                            <Button
                                // key={ villager } 
                                onClick={() => { submitGuess(villager) }}
                                color={
                                    !guess ? "default" : 
                                    (villagerInfo.name).startsWith(villager) ? 
                                        "primary" : "secondary"
                                }
                                startIcon={
                                    !guess ? <NoIcon /> : 
                                    (villagerInfo.name).startsWith(villager) ? 
                                        <CheckCircleOutline /> : <HighlightOff />
                                }
                                variant="outlined"
                                fullWidth={true}
                            >
                                { villager }
                            </Button>
                            </Box>
                        ))
                    }
                    </Box>
                    <Box textAlign="right">
                        <NextVillagerButton 
                            onClick={ nextChallenge } 
                            showResult={ !!guess }
                        ></NextVillagerButton>
                    </Box>
                </>}
            </Box>
            <Box display="flex" justifyContent="space-between">
                    <TwitterShareButton
                        key={`${ score }/${ count }`}
                        url={'https://ac-quiz-game.now.sh'}
                        options={{ text: `I guessed ${ score }/${ count } villagers! #GuessTheVillagerAC #AnimalCrossing #ACNH` }}
                    />
                    <GitHubButton url="https://github.com/Avalai/ac-quiz-game" />
            </Box>
            </Container>
        </MuiThemeProvider>
    )
}

export default Index
