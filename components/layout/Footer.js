import { Transition } from 'react-transition-group'
import { LogoFull } from '../assets/SVGassets'
import { FaFacebook, FaTwitter, FaInstagram, FaVimeo } from 'react-icons/lib/fa'

const Footer = ({ show, duration, socials }) => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 900
  // const links = {
  //   twitter: '',
  //   facebook: '',
  //   linkedin: 'https://www.linkedin.com/company/valyant-ai'
  // }
  const defaultStyle = { transform: 'translate3d(0,10vh,0)', transition: `transform ${duration}ms ease-in`, zIndex: 0, opacity: 0 }
  const transitionStyles = {
    entering: { transform: 'translate3d(0,10vh,0)', zIndex: 0, opacity: 0 },
    entered: { transform: 'translate3d(0,0,0)', zIndex: 1000, opacity: 1 }
  }
  const socialIconStyles = {
    fill: 'white',
    backgroundColor: '#4597BB',
    fontSize: '1.5em',
    padding: '.15em',
    borderRadius: '200px',
    boxSizing: 'content-box',
    // marginRight: '1em'
  }
  return (
    <Transition in={show} timeout={duration}>
      {state => (
        <div className='footer' style={{ ...defaultStyle, ...transitionStyles[state] }}>
          { show && <div className='logo-wrapper'><LogoFull /></div>}
          <div className='copy-wrapper'>
            <div className='q'>In the media? Please feel free to reach out.</div>
            <div className='email'>MEDIAINQUIRIES@VALYANT.AI</div>
            <div className='copyright'>Copyright Valyant Ai 2018</div>
          </div>
          { socials && <div className='socials'>
            <FaTwitter style={socialIconStyles} />
            <FaFacebook style={socialIconStyles} />
            <FaInstagram style={socialIconStyles} />
            <FaVimeo style={socialIconStyles} />
          </div> }
          <style jsx>{`
            .footer {
              position: fixed; 
              box-sizing: border-box;
              width: 100vw;
              {/* height: ${width >= 1000 ? '20vh' : '25vh'}; */}
              height: 20vh;
              background-color: white;
              bottom: 0;
              left: 0;
              {/* z-index: ${show ? 100 : 0}; */}
              display: flex;
              flex-direction: ${width >= 700 ? 'row' : 'column'};
              flex-grow: 1;
              justify-content: center;
              align-items: center;
              color: #1F5877;
              padding: 2vw 2vw 0 4vw;
            }
            .logo-wrapper {
              margin-right: 1em;
            }
            .copy-wrapper {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              letter-spacing: .05em;
              line-height: 1.1em;
              {/* margin-bottom: -3em; */}
              height: 108px;
              margin-left: 1em;
            }
            .email {
              font-weight: 800;
              letter-spacing: .1em;
              {/* margin-bottom: 1em; */}
              {/* display: inline-block; */}
              {/* margin-left: 1em; */}
            }
            {/* .q {
              display: flex;
              flex-direction: ${width >= 1000 ? 'row' : 'column'};
              align-items: flex-end;
              justify-content: flex-end;
              width: 50vw;
            } */}
            .socials {
              display: flex;
              justify-content: space-between;
              width: 20vw;
              margin-right: ${width >= 1000 ? '1em' : 0};
              margin: ${width >= 1000 ? 0 : '1em'};
              {/* margin-right: ${width >= 1000 ? '1em' : 0};
              margin: ${width >= 1000 ? 0 : '1em'};               */}
            }
          `}</style>
        </div>
      )}
    </Transition>
  )
}

export default Footer
