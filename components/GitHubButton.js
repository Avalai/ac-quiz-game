import Button from '@material-ui/core/Button'
import GitHubIcon from '@material-ui/icons/GitHub'

const buttonStyle = {
    background: '#fff',
    color: '#000',
    fontSize: '11px',
    paddingTop: '4px',
    paddingBottom: '4px',
}

export default (props) => {
    return (
        <a
            href={props.url}
            style={{textDecoration: 'none'}}
            target="_blank"
        >
            <Button 
                style={buttonStyle} 
                startIcon={<GitHubIcon style={{fontSize: '12px'}} />}>
                GitHub
            </Button>
        </a>
    )

}