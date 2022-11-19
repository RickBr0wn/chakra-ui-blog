import {
	ChatIcon,
	CopyIcon,
	LockIcon,
	PlusSquareIcon,
	UnlockIcon
} from '@chakra-ui/icons'
import {
	Avatar,
	Box,
	Button,
	Flex,
	HStack,
	Spacer,
	Stack,
	useColorModeValue
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ToggleLightDark from './ToggleLightDark'

const Navbar = () => {
	const { data: session, status } = useSession()
	const router = useRouter()
	const colorModeValue = useColorModeValue('gray.300', 'gray.900')
	const isActive = (route: string): boolean => route === router.pathname

	if (status === 'loading') return <div>Loading... </div>

	const signout = async () => {}

	return (
		<Box bg={colorModeValue} px={8}>
			<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
				<HStack spacing={8} alignItems={'center'}>
					<Link href='/'>
						<Button
							size={'sm'}
							isActive={isActive('/')}
							leftIcon={<ChatIcon />}
							colorScheme={'whatsapp'}
							variant={'solid'}
						>
							Posts
						</Button>
					</Link>
					{session ? (
						<>
							<Link href='/drafts'>
								<Button
									size={'sm'}
									isActive={isActive('/drafts')}
									leftIcon={<CopyIcon />}
									colorScheme={'whatsapp'}
									variant={'solid'}
								>
									Drafts
								</Button>
							</Link>
							<Link href='/create'>
								<Button
									size={'sm'}
									isActive={isActive('/create')}
									leftIcon={<PlusSquareIcon />}
									colorScheme={'whatsapp'}
									variant={'outline'}
								>
									New Post
								</Button>
							</Link>
						</>
					) : null}
				</HStack>
				<Flex>
					<ToggleLightDark />
					{session ? (
						<Flex alignItems={'center'}>
							<Button
								onClick={signout}
								display={{ base: 'none', md: 'inline-flex' }}
								fontWeight={600}
								size={'sm'}
								colorScheme={'whatsapp'}
								leftIcon={<LockIcon />}
								mr={4}
							>
								Sign Out
							</Button>
							{session.user?.image ? (
								<Avatar size={'sm'} src={session.user?.image} />
							) : (
								<Avatar
									bg={'whatsapp.200'}
									size={'sm'}
									name={session.user?.name || ''}
								/>
							)}
						</Flex>
					) : (
						<Flex
							flex={{ base: 1, md: 0 }}
							justify={'flex-end'}
							direction={'row'}
							alignItems={'center'}
							mr={6}
						>
							<Link href='/api/auth/signin'>
								<Button
									fontWeight={600}
									size={'sm'}
									colorScheme={'whatsapp'}
									leftIcon={<UnlockIcon />}
								>
									Sign In
								</Button>
							</Link>
						</Flex>
					)}
				</Flex>
			</Flex>
		</Box>
	)
}

export default Navbar
