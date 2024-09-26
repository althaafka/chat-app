import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';

const user_data = {
  "id": "customer@mail.com",
  "name": "king customer",
  "image_url": "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
};

const raw_data = {
    "results": [
      {
        "room": {
          "name": "Product A",
          "id": 12456,
          "type": "multiple", 
          "image_url": "https://picsum.photos/id/237/200/300",
          "participant": [
            {
              "id": "admin@mail.com",
              "name": "Admin",
              "role": 0
            },
            {
              "id": "agent@mail.com",
              "name": "Agent A",
              "role": 1
            },
            {
              "id": "customer@mail.com",
              "name": "King Customer",
              "role": 2
            }
          ]
        },
        "comments": [
          {
            "id": 885512,
            "type": "text",
            "message": "Selamat malam",
            "sender": "customer@mail.com"
          },
          {
            "id": 885513,
            "type": "text",
            "message": "Malam",
            "sender": "agent@mail.com"
          }
        ]
      },
      {
        "room": {
          "name": "Private Chat",
          "id": 98765,
          "type": "single",  
          "image_url": null,
          "participant": [
            {
              "id": "admin@mail.com",
              "name": "Admin"
            },
            {
              "id": "customer@mail.com",
              "name": "King Customer"
            }
          ]
        },
        "comments": [
          {
            "id": 987510,
            "type": "text",
            "message": "Halo, ini private chat.",
            "sender": "admin@mail.com"
          },
          {
            "id": 987511,
            "type": "text",
            "message": "Halo Admin, ada yang bisa saya bantu?",
            "sender": "customer@mail.com"
          }
        ]
      },
      {
        "room": {
          "name": "Product B",
          "id": 65432,
          "type": "multiple",
          "image_url": "https://picsum.photos/id/238/200/300",
          "participant": [
            {
              "id": "admin@mail.com",
              "name": "Admin",
              "role": 0
            },
            {
              "id": "agent2@mail.com",
              "name": "Agent B",
              "role": 1
            },
            {
              "id": "customer2@mail.com",
              "name": "VIP Customer",
              "role": 2
            }
          ]
        },
        "comments": [
          {
            "id": 654321,
            "type": "text",
            "message": "Apakah ada diskon untuk produk ini?",
            "sender": "customer2@mail.com"
          }
        ]
      },
      {
        "room": {
          "name": "Private Chat with Customer",
          "id": 87654,
          "type": "single",
          "image_url": null,
          "participant": [
            {
              "id": "agent@mail.com",
              "name": "Agent A"
            },
            {
              "id": "customer@mail.com",
              "name": "King Customer"
            }
          ]
        },
        "comments": [
          {
            "id": 876541,
            "type": "text",
            "message": "Halo, ini chat pribadi dengan agen.",
            "sender": "customer@mail.com"
          }
        ]
      },
      {
        "room": {
          "name": "Product C",
          "id": 54321,
          "type": "multiple",
          "image_url": "https://picsum.photos/id/239/200/300",
          "participant": [
            {
              "id": "admin@mail.com",
              "name": "Admin",
              "role": 0
            },
            {
              "id": "agent3@mail.com",
              "name": "Agent C",
              "role": 1
            },
            {
              "id": "customer3@mail.com",
              "name": "Regular Customer",
              "role": 2
            }
          ]
        },
        "comments": [
          {
            "id": 543211,
            "type": "text",
            "message": "Saya tertarik dengan produk ini.",
            "sender": "customer3@mail.com"
          }
        ]
      },
      {
        "room": {
          "name": "Support",
          "id": 67890,
          "type": "single",
          "image_url": null,
          "participant": [
            {
              "id": "support@mail.com",
              "name": "Support Agent"
            },
            {
              "id": "customer@mail.com",
              "name": "King Customer"
            }
          ]
        },
        "comments": [
          {
            "id": 678901,
            "type": "text",
            "message": "Apakah bisa membantu saya?",
            "sender": "customer@mail.com"
          }
        ]
      },
      {
        "room": {
          "name": "Private Discussion",
          "id": 12345,
          "type": "single",
          "image_url": null,
          "participant": [
            {
              "id": "manager@mail.com",
              "name": "Manager"
            },
            {
              "id": "employee@mail.com",
              "name": "Employee"
            }
          ]
        },
        "comments": [
          {
            "id": 123451,
            "type": "text",
            "message": "Kita perlu berdiskusi.",
            "sender": "manager@mail.com"
          }
        ]
      },
      {
        "room": {
          "name": "Product D",
          "id": 11223,
          "type": "multiple",
          "image_url": "https://picsum.photos/id/240/200/300",
          "participant": [
            {
              "id": "admin@mail.com",
              "name": "Admin",
              "role": 0
            },
            {
              "id": "agent4@mail.com",
              "name": "Agent D",
              "role": 1
            },
            {
              "id": "customer4@mail.com",
              "name": "Loyal Customer",
              "role": 2
            }
          ]
        },
        "comments": [
          {
            "id": 112231,
            "type": "text",
            "message": "Saya tertarik dengan promo produk ini.",
            "sender": "customer4@mail.com"
          }
        ]
      },
      {
        "room": {
          "name": "Private Inquiry",
          "id": 33445,
          "type": "single",
          "image_url": null,
          "participant": [
            {
              "id": "sales@mail.com",
              "name": "Sales Agent"
            },
            {
              "id": "customer5@mail.com",
              "name": "Potential Buyer"
            }
          ]
        },
        "comments": [
          {
            "id": 334451,
            "type": "text",
            "message": "Halo, saya tertarik dengan produk Anda.",
            "sender": "customer5@mail.com"
          }
        ]
      },
      {
        "room": {
          "name": "Product E",
          "id": 99887,
          "type": "multiple",
          "image_url": "https://picsum.photos/id/241/200/300",
          "participant": [
            {
              "id": "admin@mail.com",
              "name": "Admin",
              "role": 0
            },
            {
              "id": "agent5@mail.com",
              "name": "Agent E",
              "role": 1
            },
            {
              "id": "customer6@mail.com",
              "name": "Frequent Buyer",
              "role": 2
            }
          ]
        },
        "comments": [
          {
            "id": 998871,
            "type": "text",
            "message": "Apakah ada potongan harga?",
            "sender": "customer6@mail.com"
          }
        ]
      },
      {
        "room": {
          "name": "Private Complaint",
          "id": 77889,
          "type": "single",
          "image_url": null,
          "participant": [
            {
              "id": "support@mail.com",
              "name": "Support Agent"
            },
            {
              "id": "customer7@mail.com",
              "name": "Frustrated Customer"
            }
          ]
        },
        "comments": [
          {
            "id": 778891,
            "type": "text",
            "message": "Saya ada keluhan mengenai produk Anda.",
            "sender": "customer7@mail.com"
          }
        ]
      }
    ]
  }  

function App() {
  const [user, setUser] = useState(user_data);
  const [menu, setMenu] = useState("Chats");
  const [items, setItems] = useState(raw_data.results);

  const getRoomName = (room) => {
    if (room.type === "single") {
      const otherParticipant = room.participant.find(p => p.id !== user.id);
      return otherParticipant ? otherParticipant.name : "Private Chat";
    }
    return room.name;
  };

  return (
    <div className="container">
      <Navbar user={user} activeMenu={menu} setMenu={setMenu} />
      <div className="menu">
        <div className="menu-header">{menu}</div>
        <div className="menu-controls">
          <input type="text" className="search-bar" placeholder="Search" />
          <button className="add-button">+</button>
        </div>
        <ul className="item-list">
          {items.map((item, index) => (
            <li key={item.room.id} className="item">
              <img src={item.room.image_url} className="item-avatar" />
              <div className="item-details">
                <div className="item-name">
                  {getRoomName(item.room)}
                </div>
                <div className="item-message">{item.comments[0].message}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-area">
        chat
      </div>
      <div className="side-bar">
        side-bar
      </div>
    </div>
  );
}
  

export default App;
