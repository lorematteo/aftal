import React from "react";
import Svg, { Defs, ClipPath, Path, Image } from 'react-native-svg';


export default class MatchCardShape extends React.Component {
  render() {
    return (
        <Svg width="100%" height="100%" viewBox="0 0 595 906">
          <Defs>
            <ClipPath id="clip_out" clipRule="evenodd">
              <Path
                d="M297 1.00005L96 0.999939C49.5 0.99992 0.499786 6 0.499786 93.5V812.5C0.499786 900 49.5 905 96 905H169.5C199 905.5 207 897.5 207 869.5C207 841.5 237 788 297 788H297.5C357.5 788 387.5 841.5 387.5 869.5C387.5 897.5 395.5 905.5 425 905H498.5C545 905 594 900 594 812.5V93.5C594 6 545 0.99992 498.5 0.999939L297.5 1.00005H297Z"
              />
            </ClipPath>
          </Defs>
          <Image 
            clipPath="url(#clip_out)"
            x="0"
            y="0"
            width="595"
            height="906"
            preserveAspectRatio="xMidYMid slice"
            href={this.props.image}
          />
        </Svg>
    );
  }
}