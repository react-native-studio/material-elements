import React,{Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';
import PropTypes from 'prop-types';
import Placeholder from '../Placeholder'
import Card from '../Card'
import ListItem from '../ListItem'
import * as Color from '../styles/colors'
export default class PlaceHolderExample extends Component{
  render(){
    return(<View>
      <Card style={{container:{paddingVertical:5,paddingHorizontal:10}}}>
        <ListItem centerElement='ImageContent'/>
        <Placeholder.ImageContent
        size={60}
        animate="fade"
        lineNumber={4}
        lineSpacing={5}
        lastLineWidth="30%"
        onReady={false}
        >
        <Text>Placeholder has finished :D</Text>
      </Placeholder.ImageContent>
      </Card>
      <Card style={{container:{paddingVertical:5,paddingHorizontal:10}}}>
        <ListItem centerElement='Line'/>
        <Placeholder.Line
          width="77%"
          textSize={14}
          onReady={false}
        >
          <Text>Placeholder finished</Text>
        </Placeholder.Line>
      </Card>
      <Card style={{container:{paddingVertical:5,paddingHorizontal:10}}}>
        <ListItem centerElement='Media'/>
        <Placeholder.Media
          size={70}
          hasRadius
          onReady={false}
        >
          <Text>Placeholder finished</Text>
        </Placeholder.Media>
      </Card>
      <Card style={{container:{paddingVertical:5,paddingHorizontal:10}}}>
        <ListItem centerElement='Paragraph'/>
        <Placeholder.Paragraph
          lineNumber={3}
          textSize={16}
          lineSpacing={5}
          width="100%"
          lastLineWidth="70%"
          firstLineWidth="50%"
          onReady={false}
        >
          <Text>Placeholder finished</Text>
        </Placeholder.Paragraph>
      </Card>
        <Card style={{container:{paddingVertical:5,paddingHorizontal:10}}}>
          <ListItem centerElement='MultiWords'/>
        <Placeholder.MultiWords
          words={[
            { color: Color.red500, width: '20%' },
            { color: Color.blue500, width: '40%' },
            { color: Color.green500, width: '20%' }
          ]}
          textSize={14}
          onReady={false}

        >
          <Text>Placeholder finished</Text>
        </Placeholder.MultiWords>
      </Card>
      <Card style={{container:{paddingVertical:5,paddingHorizontal:10}}}>
        <ListItem centerElement='Box'/>
        <Placeholder.Box
          height={56}
          width={200}
          color={Color.blue500}
          radius={8}
          onReady={false}

        >
          <Text>Placeholder finished</Text>
        </Placeholder.Box>
      </Card>
    </View>)
  }
}
