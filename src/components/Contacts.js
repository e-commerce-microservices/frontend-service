import { Avatar } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, changeChat }) {
	const [currentSelected, setCurrentSelected] = useState(undefined);
	const changeCurrentChat = (index, contact) => {
		setCurrentSelected(index);
		changeChat(contact);
	};
	return (
		<Container>
			<div className="brand">
				<h3>Lich sử chat</h3>
			</div>
			<div className="contacts">
				{contacts.map((contact, index) => {
					return (
						<div
							key={index}
							className={`contact ${
								index === currentSelected ? "selected" : ""
							}`}
							onClick={() => changeCurrentChat(index, contact)}
						>
							<div className="avatar">
								<Avatar> {contact ? contact.to.name : "test shop name"}</Avatar>
							</div>
							<div className="username">
								<h3>{contact.to.name}</h3>
							</div>
						</div>
					);
				})}
			</div>
			{/* <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div> */}
		</Container>
	);
}
const Container = styled.div`
	display: grid;
	grid-template-rows: 10% 75% 15%;
	overflow: hidden;
	background-color: #eeeeee;
	border-right: 2px solid #e0e0e0;
	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: center;
		img {
			height: 2rem;
		}
		h3 {
			color: #000;
		}
	}
	.contacts {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		gap: 0.8rem;
		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: #fff;
				width: 0.1rem;
				border-radius: 1rem;
			}
		}
		.contact {
			background-color: #fff;
			min-height: 5rem;
			cursor: pointer;
			width: 90%;
			border-radius: 0.2rem;
			padding: 0.4rem;
			display: flex;
			gap: 1rem;
			align-items: center;
			transition: 0.5s ease-in-out;
			.avatar {
				img {
					height: 3rem;
				}
			}
			.username {
				h3 {
					color: #000;
				}
			}
		}
		.selected {
			background-color: #1976d2;
		}
	}

	.current-user {
		background-color: #e0e0e0;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		.avatar {
			img {
				height: 4rem;
				max-inline-size: 100%;
			}
		}
		.username {
			h2 {
				color: #000;
			}
		}
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			gap: 0.5rem;
			.username {
				h2 {
					font-size: 1rem;
				}
			}
		}
	}
`;
