import { Flex } from '@chakra-ui/react'
import { FC } from 'react'
import Navbar from './Navbar'

interface Props {
	children: React.ReactNode
}

const Layout: FC<Props> = ({ children }): JSX.Element => {
	return (
		<Flex h={'100vh'} w={'100vw'} flexDir={'column'}>
			<Navbar /> {/* This navbar is 80px tall */}
			{children}
		</Flex>
	)
}

export default Layout
