// FUNCTIONAL
import { useState, useEffect } from 'react'
import lodash from 'lodash'
import wiki from 'wikijs'

// DESIGN
import { CssBaseline, Container, Box, Button, Typography } from '@material-ui/core'
import { spacing } from '@material-ui/system'
import { CheckCircleOutline, HighlightOff } from '@material-ui/icons'

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// COMPONENTS
import ResultDetails from '../components/ResultDetails'
import NextVillagerButton from '../components/NextVillagerButton'
import NoIcon from '../components/NoIcon'
import theme from '../src/theme'
import PageHead from '../components/Head'

const nookipedia = wiki({
    apiUrl: 'https://nookipedia.com/w/api.php',
    origin: '*',
})
const pageFilter = ['Category:', 'User:']

const speciesMap = { 
    Cow: 'Bovine', 
    Bull: 'Bovine', 
    'Frog (species)': 'Frogs', 
    Mouse: 'Mice', 
    'Octopus (species)': 'Octopuses',
    Ostrich: 'Ostriches',
    Sheep: 'Sheep',
    Wolf: 'Wolves',
}
const speciesPlural = species => species in speciesMap ? speciesMap[species] : `${species}s`
const speciesBlacklist = new Set(
    [
        ...Object.keys(speciesMap),
        'Octopus (fish)'
    ]
)

const Index = () => {
    const [villagers, setVillagers] = useState([])
    const [villagerImage, setVillagerImage] = useState()
    const [villagerInfo, setVillagerInfo] = useState([])

    const [guess, setGuess] = useState('')
    // const [showResult, setShowResult] = useState(false)

    const [loading, setLoading] = useState(true)
    const [reload, setReload] = useState(0)
    useEffect(() => {
        const fetchVillagers = async () => {
        // GET THE MAIN VILLAGER
            const allVillagers = (
                await nookipedia.pagesInCategory('Category:Villagers')
            ).filter(x => {
                if (pageFilter.some(prefix => x.startsWith(prefix))) {
                    return false
                }
                return true
            })
            // console.log(allVillagers.reverse())
            const primaryVillager = _.sample(allVillagers) //'Groucho'

            // Get the page data and parsed info about the main villager
            const getPrimaryVillager = await nookipedia.page(primaryVillager)
            const primaryInfo = await getPrimaryVillager.fullInfo()

            // Set personality and species variables
            const { personality, species } = primaryInfo.general

        // GET SAME PERSONALITY VILLAGERS
            const personalityVillagers = (
                await nookipedia.pagesInCategory(`Category:${personality} villagers`)
            ).filter( x => {
                if ([personality, primaryVillager].some(item => item === x)) {
                    return false
                }
                if (pageFilter.some(prefix => x.startsWith(prefix))) {
                    return false
                }
                return true
            })
            const samePersonalityVillager = _.sample(personalityVillagers) //'Peewee'

        // GET SAME SPECIES VILLAGERS

            const speciesVillagers = (
                await nookipedia.pagesInCategory(`Category:${speciesPlural(species)}`)
            ).filter( x => {
                if ([species, primaryVillager, samePersonalityVillager].some(item => item === x)) {
                    return false
                }
                if (speciesBlacklist.has(x)) {
                    return false
                }
                if (pageFilter.some(prefix => x.startsWith(prefix))) {
                    return false
                }
                return true
            })
            const sameSpeciesVillager = _.sample(speciesVillagers) // 'Klaus'

        // TESTS
            
            console.table(primaryInfo.general)
            console.log(personalityVillagers)
            console.log(speciesVillagers)
            console.log(primaryVillager, personality, species)
            console.log(primaryVillager, samePersonalityVillager, sameSpeciesVillager)

        // SET STATES

            // Trimming Villager Names
            const trimName = name => name.split('(')[0]
            primaryInfo.general.name = trimName(primaryInfo.general.name)
            const chosenVillagers = [
                primaryVillager, 
                samePersonalityVillager, 
                sameSpeciesVillager
            ].map(trimName)
            setVillagers(_.shuffle(chosenVillagers))

            // Saving info on the main villager
            setVillagerImage(await getPrimaryVillager.mainImage())
            // setVillagerImage('https://nookipedia.com/w/images/8/83/Groucho_NLa.png')
            setVillagerInfo(primaryInfo.general)
            // setVillagerInfo({name: 'Groucho', personality: 'Cranky', species: 'Bear'})

            // Turn off loading state
            setLoading(false)
        }
        fetchVillagers()
    }, [reload])

    const nextChallenge = () => {
        setReload(reload + 1)
        setLoading(true)
        setGuess('')
    }

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
                                onClick={ () => {setGuess(villager)} }
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
                            showResult={ guess !== '' }
                        ></NextVillagerButton>
                    </Box>
                </>}
            </Box>
            </Container>
        </MuiThemeProvider>
    )
}

export default Index
