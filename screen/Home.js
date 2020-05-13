import React, { useState } from 'react'

import { StatusBar, Dimensions } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

import styled from 'styled-components/native'

import Header from '../components/Header'
import Hero from '../components/Hero'
import Movies from '../components/Movies'

import { useSpring, useTransition, animated, config } from 'react-spring'

const api = [
	require('../assets/movie1.jpg'),
	require('../assets/movie2.jpg'),
	require('../assets/movie3.jpg'),
	require('../assets/movie4.jpg')
]

const Container = styled.ScrollView`
	flex: 1;
	background-color: #000;
`

const Poster = styled.ImageBackground`
	width: 100%;
	position: absolute;
	height: ${(Dimensions.get('window').height * 81) / 100}px;
`

const Gradient = styled(LinearGradient)`
	height: 100%;
`
const Content = styled.View`
	margin-top: ${(Dimensions.get('window').height * 81) / 100}px;
`

const AnimatedPoster = animated(Poster);

const Home = () => {

	const [selected, setSelected] = useState(null);

	const ImageTransitions = useTransition(selected, null, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
	})

	return (
		<>
			<StatusBar
				translucent
				backgroundColor='transparent'
				barStyle='light-content'
			/>
			<Container>				
				{ImageTransitions.map(({ item, props, key }) => {
					return (
						<AnimatedPoster key={key} style={props} source={item ?? require('../assets/poster.jpg')}>
							<Gradient
								locations={[0, 0.2, 0.6, 0.93]}
								colors={[
									'rgba(0,0,0,0.5)',
									'rgba(0,0,0,0.0)',
									'rgba(0,0,0,0.0)',
									'rgba(0,0,0,1)'
								]}>
								<Header />
								<Hero item={item} />
							</Gradient>
						</AnimatedPoster>)
				})}
				<Content/>
				<Movies label='Recomendados' item={api} onSelect={item => { setSelected(item);}} />
				<Movies label='Top 10' item={api} onSelect={item => setSelected(item)} />
			</Container>
		</>
	)
}

export default Home
