import { Transition } from 'react-transition-group'

const Footer = ({ show, duration }) => {
  const defaultStyle = { opacity: 0, transform: 'translate3d(0,10vh,0)', transition: `opacity ${duration}ms ease-in, transform ${duration}ms ease-in` }
  const transitionStyles = {
    entering: { opacity: 0, transform: 'translate3d(0,10vh,0)' },
    entered: { opacity: 1, transform: 'translate3d(0,0,0)' }
  }
  return (
    <Transition in={show} timeout={duration}>
      {state => (
        <div className='footer' style={{ ...defaultStyle, ...transitionStyles[state] }}>
          <div> socials </div>
          <style jsx>{`
            .footer {
              position: fixed;
              width: 100vw;
              height: 10vh;
              background-color: #4597BB;
              bottom: 0;
              left: 0;
              z-index: 100;
            }
          `}</style>
        </div>
      )}
    </Transition>
  )
}

export default Footer
