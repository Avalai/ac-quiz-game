import Button from '@material-ui/core/Button'
import {ArrowForward} from '@material-ui/icons'

const NextVillagerButton = (props) => {
    return (
        <>
        { props.showResult &&
            <Button onClick={ props.onClick } endIcon={<ArrowForward />}>Next Villager</Button>
        }
        </>
    )
}

export default NextVillagerButton