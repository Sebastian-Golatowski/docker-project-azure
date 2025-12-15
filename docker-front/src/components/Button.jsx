export const Button = ({name, color, onClick}) => {
  return(
    <button 
    onClick={onClick}
    style={{backgroundColor: color}} 
    className="btn" 
    >
        {name}
    </button>
  )
}
