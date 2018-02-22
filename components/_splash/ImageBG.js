import { Transition } from 'react-transition-group'

const ImageBG = ({ animateIn, image, duration }) => {
  const defaultStyle = {
    opacity: 0
  }
  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1, transition: `opacity ${duration}ms ease-in` }
  }
  return (
    <Transition exit={false} in={animateIn} timeout={duration}>
      { state => (
        <div className='img-wrapper' style={{ ...defaultStyle, ...transitionStyles[state] }}>
          <div className='inner-wrapper' />
          <style jsx>{`
            .inner-wrapper {
              background-image: url('${image}');
              background-size: cover;
              width: 100%;
              height: 100%;
            }
            .img-wrapper {
              position: absolute;
              width: 100%;
              height: 100%;
              opacity:0;
            }
          `}</style>
        </div>
      )}
    </Transition>
  )
}

export default ImageBG
