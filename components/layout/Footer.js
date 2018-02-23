import { Transition } from 'react-transition-group'
import { LogoFull } from '../assets/SVGassets'

const Footer = ({ show, duration }) => {
  const defaultStyle = { transform: 'translate3d(0,10vh,0)', transition: `transform ${duration}ms ease-in` }
  const transitionStyles = {
    entering: { transform: 'translate3d(0,10vh,0)' },
    entered: { transform: 'translate3d(0,0,0)' }
  }
  return (
    <Transition in={show} timeout={duration}>
      {state => (
        <div className='footer' style={{ ...defaultStyle, ...transitionStyles[state] }}>
          { show && <LogoFull />}
          <div className='copy-wrapper'>
            <div>In the media? Please feel free to reach out.</div>
            <div className='email'>MEDIAINQUIRIES@VALYANT.AI</div>
            <div className='copyright'>Copyright Valyant Ai 2018</div>
          </div>
          <div className='socials'>social social social</div>
          <style jsx>{`
            .footer {
              position: fixed;
              width: 96vw;
              height: 15vh;
              background-color: white;
              bottom: 0;
              left: 0;
              z-index: ${show ? 100 : 0};
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: #1F5877;
              padding: 0 2vw;
            }
            .copy-wrapper {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
          `}</style>
        </div>
      )}
    </Transition>
  )
}

export default Footer
