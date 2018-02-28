import { Transition } from 'react-transition-group'

export default ({ show, duration, width }) => {
    console.log(width > 500)
  
  const defaultStyle = {
    opacity: 0,
    transform: 'translate3d(-5vw,0,0)',
    transition: `opacity ${duration}ms ease-in,
    transform ${duration}ms ease-in`,
    top: width > 500 ? '35vh' : '20vh',
    height: width > 500 ? '30vh' : '45vh'
  }
  const transitionStyles = {
    entering: { opacity: 0, transform: 'translate3d(-5vw,0,0)' },
    entered: { opacity: 1, transform: 'translate3d(0,0,0)' }
  }
  return (
    <Transition in={show} timeout={duration}>
      {state => (
        <div className='side-tag' style={{ ...defaultStyle, ...transitionStyles[state] }}>
          <style jsx>{`
            .side-tag {
              position: absolute;
              left: -1vw;
              top: ${width > 500 ? '35vh' : '20vh'};
              height: ${width > 500 ? '30vh' : '45vh'};
              width: 5vw;
              z-index: 30;
              background-color: #4597BB;            
            }
          `}</style>
        </div>
      )}
    </Transition>
  )
}
