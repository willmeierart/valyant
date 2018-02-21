// import Animate from 'react-move/Animate'
// import NodeGroup from 'react-move/NodeGroup'
import React, { Component } from 'react'
// import { Transition } from 'react-transition-group'
import TransitionSled from './TransitionSled'
import ImageBG from './ImageBG'
import TextBlock from './TextBlock'
import Logo from './Logo'

export default class View extends Component {
  constructor (props) {
    super(props)
    // this.state = {
    //   inProp: false
    // }
  }

  componentDidMount () { setTimeout(() => { this.setState({ inProp: true }) }, 100) }

  render () {
    const { imageUrl, copyStyles, headerCopy, bodyCopy, isFirstView, index } = this.props.view
    console.log('view rerender');
    // const { inProp } = this.state
    // const inProp = setTimeout(() => { return true }, 50)
    // const defaultStyle = {
    //   transition: 'transform 800ms ease-in-out',
    //   transform: `translateX(-100)`
    // }
    // const transitionStyles = {
    //   entering: { transform: `translateX(-100)` },
    //   // entering: { transform: `translateX(${el === 'txt' ? 100 : -100})` },
    //   entered: { transform: `translateX(0)` }
    // }
    // console.log(inProp);
    // console.log(bodyCopy);
    return (
      <div className='view'>
        <div className='inner-view'>
          <div className='logo-wrapper'>
            <Logo key={`logo${!isFirstView}`} isFirstView={isFirstView} />
          </div>
          {/* <TransitionSled k={index}>
            <div className='img-wrapper'>
              <ImageBG key={index} isFirstView={isFirstView} url={imageUrl} />
            </div>
          </TransitionSled> */}
           <div className='img-wrapper'>
              <ImageBG key={index} isFirstView={isFirstView} url={imageUrl} />
            </div>
          {/* <Transition mountOnEnter in={inProp} timeout={100}>
            { state => (
              <div className='img-wrapper' style={{ ...defaultStyle, ...transitionStyles[state] }}>
                <ImageBG isFirstView={isFirstView} url={imageUrl} />
              </div>
            )}
          </Transition> */}
          {/* {[{ ...view, x: 50, dest: 0 }].map(v => (
            <Animate
              key={`img${index}`}
              start={{
                x: v.x
              }}
              update={{
                x: [v.x],
                timing: {
                  duration: 500
                  // easing: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)'
                }
              }}>
              {({ x }) => {
                console.log(v, x)
                return (
                  <div className='img-wrapper' style={{ transform: `translate3d(${x}%, 0, 0)` }}>
                    <ImageBG isFirstView={isFirstView} url={imageUrl} />
                  </div>
                )
              }}
            </Animate>
          ))} */}
          {/* <NodeGroup
            data={view}
            keyAccessor={d => d.index}
            start={(data, index) => ({
              x: 50
            })}
            enter={(data, index) => ({
              x: [50]
            })}
            update={{
              x: [v.x],
              timing: {
                duration: 500
                // easing: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)'
              }
            }}>
            {({ x }) => {
              console.log(v, x)
              return (
                <div className='img-wrapper' style={{ transform: `translate3d(${x}px, 0, 0)` }}>
                  <ImageBG isFirstView={isFirstView} url={imageUrl} />
                </div>
              )
            }}
          </NodeGroup> */}

          <div className='txt-wrapper'>
            <TextBlock key={`txt${index}`} isFirstView={isFirstView} styles={copyStyles} header={headerCopy} body={bodyCopy} />
          </div>
        </div>
        <style jsx>{`
          .view {
            width: 100%;
            height: 100%;
            overflow: hidden;
            position: absolute;
          }
          .inner-view {
            width: 100%;
            height: 100%;
            position: relative;
            {/* top: -21px!important; */}
          }
          .logo-wrapper {
            position:absolute;
            z-index: 10;
            width: 100%;
          }
          .img-wrapper {
            position: absolute;
            width: 100%;
            height: 100%;
            transform: translate3d(0,0,0)
          }
          .txt-wrapper {
            display: absolute;
            z-index: 10;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    )
  }
}
