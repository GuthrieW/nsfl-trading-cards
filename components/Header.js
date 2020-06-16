import React from 'react';
import { NavbarBrand, Navbar, NavItem, NavLink, Nav, Button } from 'reactstrap';
import Swal from 'sweetalert';
import Router from 'next/router';
import NsflLogo from './../public/favicon.ico';
import { callApi, Method } from '/dotts-trading-cards-ui/common/api/call-api';
import { API_URL } from '/dotts-trading-cards-ui/common/api/api-url';
import { Status } from '/dotts-trading-cards-ui/common/api/http-status';

export default class Header extends React.Component {
	constructor() {
		super();

		this.state = {
			isAdmin: false,
			isLoading: true,
		};

		this.handleResetCanPurchasePacks = this.handleResetCanPurchasePacks.bind(
			this
		);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleEditProfile = this.handleEditProfile.bind(this);
	}

	async componentDidMount() {
		const url = `${API_URL}/user/isAdmin`;
		const method = Method.GET;

		await callApi(url, method)
			.then((response) => {
				if (response.status !== Status.OK) {
					Swal({
						title: 'Server Error',
						text: 'The server encountered an error',
						icon: 'error',
					});
				} else {
					this.setState({
						isAdmin: response.data,
						isLoading: false,
					});
				}
			})
			.catch((error) => {
				console.error(error);
				Swal({
					title: 'Server Error',
					text: 'The server encountered an error',
					icon: 'error',
				});
			});
	}

	async handleEditProfile() {
		Router.push({
			pathname: `/profile`,
		});
	}

	async handleResetCanPurchasePacks() {
		const url = `${API_URL}/user/resetCanPurchasePack`;
		const method = Method.PATCH;

		await callApi(url, method)
			.then((response) => {
				if (response.status === Status.OK) {
					Swal({
						title: 'Success',
						text: 'Users may now purchase packs again',
						icon: 'success',
					});
				} else {
					Swal({
						title: 'Server Error',
						text: 'The server encountered an error',
						icon: 'error',
					});
				}
			})
			.catch((error) => {
				console.error(error);
				Swal({
					title: 'Server Error',
					text: 'The server encountered an error',
					icon: 'error',
				});
			});
	}

	async handleLogout() {
		const url = `${API_URL}/auth/logout`;
		const method = Method.GET;

		await callApi(url, method)
			.then((response) => {
				if (response.status !== Status.OK) {
					Swal({
						title: 'Server Error',
						text: 'The server encountered an error',
						icon: 'error',
					});
				} else {
					Router.push({
						pathname: `/signin`,
					});
				}
			})
			.catch((error) => {
				console.error(error);
				Swal({
					title: 'Server Error',
					text: 'The server encountered an error',
					icon: 'error',
				});
			});
	}

	render() {
		return (
			<div>
				<Navbar color='light' light expand='md'>
					<NavbarBrand href='/'>
						<img
							style={{ maxHeight: '504px' }}
							className='mr-2'
							src={NsflLogo}
						/>
						NSFL Trading Cards
					</NavbarBrand>
					<Nav className='mr-auto' navbar>
						<NavItem>
							<NavLink href='/open-packs'>Open Packs</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href='/collection/my-collection'>
								My Collection
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href='/player-list'>
								Other Collections
							</NavLink>
						</NavItem>

						<NavItem>
							<NavLink href='/submit-card'>Submit a Card</NavLink>
						</NavItem>
					</Nav>
					<Nav>
						{this.state.isAdmin && (
							<NavItem>
								<Button
									className='ml-2'
									onClick={this.handleResetCanPurchasePacks}
								>
									Reset Pack Purchasing
								</Button>
							</NavItem>
						)}
						<NavItem>
							<Button
								className='ml-2'
								onClick={this.handleEditProfile}
							>
								Edit Profile
							</Button>
						</NavItem>
						<NavItem>
							<Button
								className='ml-2'
								onClick={this.handleLogout}
							>
								Logout
							</Button>
						</NavItem>
					</Nav>
				</Navbar>
			</div>
		);
	}
}
