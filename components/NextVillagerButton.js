import Button from '@material-ui/core/Button'
import {ArrowForward} from '@material-ui/icons'

export default (props) => {
    return (
        <>
        { props.showResult &&
            <Button onClick={ props.onClick } endIcon={<ArrowForward />}>Next Villager</Button>
        }
        </>
    )

}