import { Button } from './Button'

const Header = ({ title, onAdd, showAdd, onLogout }) => {
  return (
    <header className='header'>
      <h1>{title}</h1>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button 
            color={showAdd ? 'red' : 'green'} 
            name={showAdd ? 'Close' : 'Add'} 
            onClick={onAdd} 
        />
        {onLogout && (
            <Button 
                color='black' 
                name='Logout' 
                onClick={onLogout} 
            />
        )}
      </div>
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker',
}

export default Header