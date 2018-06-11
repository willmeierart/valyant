import { Transition } from 'react-transition-group'
import PropTypes from 'prop-types'
import { LogoFull } from '../assets/SVGassets'
import { FaFacebook, FaTwitter, FaInstagram, FaVimeo } from 'react-icons/lib/fa'

const Footer = ({ isMobile, show, duration, socials, width, small, mobileSideways }) => {
  const isMobileSize = width >= 700 || mobileSideways
  const w = small ? 226 : 339
  const h = small ? 78 : 108
  // const links = {
  //   twitter: '',
  //   facebook: '',
  //   linkedin: 'https://www.linkedin.com/company/valyant-ai'
  // }
  const defaultStyle = {
    transform: 'translate3d(0,10vh,0)',
    transition: `transform ${duration}ms ease-in`,
    zIndex: 0,
    opacity: 0,
    height: isMobileSize ? '20vh' : '30vh'
  }
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
    boxSizing: 'content-box'
  }
  return !isMobile
    ? (
      <Transition in={show} timeout={duration}>
        {state => (
          <div className='footer' style={{ ...defaultStyle, ...transitionStyles[state] }}>
            <div className='inner-wrapper' style={{ flexDirection: isMobileSize ? 'row' : 'column' }}>
              { show && <div className='logo-wrapper' style={{ display: 'flex', justifyContent: isMobileSize ? 'flex-end' : 'center', width: isMobileSize ? '50%' : '100%' }}><LogoFull w={w} h={h} /></div>}
              <div className='copy-wrapper' style={{ alignItems: isMobileSize ? 'flex-start' : 'center', width: isMobileSize ? '50%' : '100%' }}>
                <div className='q'>Please feel free to reach out.</div>
                <div className='email'><a href='mailto:mediainquiries@valyant.ai?subject=Hello!'>INFO@VALYANT.AI</a></div>
                <div className='copyright'>Copyright Valyant AI 2018</div>
              </div>
              { socials && <div className='socials'>
                <FaTwitter style={socialIconStyles} />
                <FaFacebook style={socialIconStyles} />
                <FaInstagram style={socialIconStyles} />
                <FaVimeo style={socialIconStyles} />
              </div> }
            </div>
            <style jsx>{`
              .footer {
                position: fixed; 
                box-sizing: border-box;
                width: 100vw;
                height: ${isMobileSize ? mobileSideways ? '30vh' : '20vh' : '30vh'};
                background-color: white;
                bottom: 0;
                left: 0;
                color: #1F5877;
                padding: 2vw 2vw 0 2vw;
              }
              .inner-wrapper {
                width: 100%;
                height: 100%;
                position: relative;
                display: flex;
                flex-direction: ${isMobileSize ? 'row' : 'column'};
                flex-grow: 1;
                justify-content: center;
                align-items: center;
              }
              .logo-wrapper {
                margin-right: 1em;
              }
              a {
                text-decoration: none;
                color: inherit;
              }
              a:hover {
                color: #4597BB;
              }
              .copy-wrapper {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: ${isMobileSize ? 'flex-start' : 'center'};
                letter-spacing: .05em;
                line-height: 1.1em;
                height: 108px;
                margin-left: ${isMobileSize || mobileSideways ? '1em' : 0};
                width: ${!isMobileSize ? '100%' : '50%'};
              }
              .email {
                font-weight: 800;
                letter-spacing: .1em;
              }
              .socials {
                display: flex;
                justify-content: space-between;
                width: 20vw;
                margin-right: ${width >= 1000 ? '1em' : 0};
                margin: ${width >= 1000 ? 0 : '1em'};
              }
            `}</style>
          </div>
        )}
      </Transition>
    )
  : (
    <div className='footer'>
      <div className='inner-wrapper' style={{ flexDirection: isMobileSize ? 'row' : 'column' }}>
        <div className='logo-wrapper' style={{ display: 'flex', justifyContent: isMobileSize ? 'flex-end' : 'center', width: isMobileSize ? '50%' : '100%' }}><LogoFull w={w} h={h} /></div>
        <div className='copy-wrapper' style={{ alignItems: isMobileSize ? 'flex-start' : 'center', width: isMobileSize ? '50%' : '100%' }}>
          <div className='q'>Please feel free to reach out.</div>
          <div className='email'><a href='mailto:mediainquiries@valyant.ai?subject=Hello!'>INFO@VALYANT.AI</a></div>
          <div className='copyright'>Copyright Valyant AI 2018</div>
        </div>
        { socials && <div className='socials'>
          <FaTwitter style={socialIconStyles} />
          <FaFacebook style={socialIconStyles} />
          <FaInstagram style={socialIconStyles} />
          <FaVimeo style={socialIconStyles} />
        </div> }
      </div>
      <style jsx>{`
        .footer {
          box-sizing: border-box;
          width: 96vw;
          height: ${isMobileSize ? mobileSideways ? '30vh' : '20vh' : '30vh'};
          background-color: white;
          bottom: 0;
          left: 0;
          color: #1F5877;
          padding: 2vw 2vw 0 2vw;
        }
        .inner-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: ${isMobileSize ? 'row' : 'column'};
          flex-grow: 1;
          justify-content: center;
          align-items: center;
        }
        .logo-wrapper {
          margin-right: 1em;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
        a:hover {
          color: #4597BB;
        }
        .copy-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: ${isMobileSize ? 'flex-start' : 'center'};
          letter-spacing: .05em;
          line-height: 1.1em;
          height: 108px;
          margin-left: ${isMobileSize || mobileSideways ? '1em' : 0};
          width: ${!isMobileSize ? '100%' : '50%'};
        }
        .email {
          font-weight: 800;
          letter-spacing: .1em;
        }
        .socials {
          display: flex;
          justify-content: space-between;
          width: 20vw;
          margin-right: ${width >= 1000 ? '1em' : 0};
          margin: ${width >= 1000 ? 0 : '1em'};
        }
      `}</style>
    </div>
  )
}

Footer.propTypes = {
  isMobile: PropTypes.bool,
  show: PropTypes.bool,
  duration: PropTypes.number.isRequired,
  socials: PropTypes.bool,
  width: PropTypes.number,
  small: PropTypes.bool.isRequired
}

export default Footer
