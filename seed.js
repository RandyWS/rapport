const { green, red } = require("chalk");
const { db } = require("./server/db");

const { User, Friend, Contact } = require("./server/db");

const users = [
  {
    userName: "HowlATME",
    password: "password",
    firstName: "Howl",
    lastName: "Pendragon",
    email: "Howl_Pendragon@gmail.com",
    imageUrl:
      "https://i.pinimg.com/736x/40/c2/ec/40c2ec16e1c646fd6c5e568d3d3028ab--howl-and-sophie-howls-moving-castle.jpg",
  },
  {
    userName: "IH8SKOOL",
    password: "password1",
    firstName: "Chihiro",
    lastName: "Ogino",
    email: "Chihiro_Ogino@gmail.com",
    imageUrl:
      "https://discourse.disneyheroesgame.com/uploads/default/original/2X/7/73ae7c0a3c13f84f530762b55c3a56a2dfac81a8.jpg",
  },
  {
    userName: "Eboshi",
    password: "password2",
    firstName: "Lady",
    lastName: "Eboshi",
    email: "Lady_Eboshi@gmail.com",
    imageUrl:
      "https://static.wixstatic.com/media/799edc_93f2862c1a7640db9ad52547d1b08507~mv2.png/v1/fill/w_398,h_396,al_c,q_85,usm_0.66_1.00_0.01/lady%20eboshi.webp",
  },
  {
    userName: "Cats",
    password: "password3",
    firstName: "Cat",
    lastName: "Bus",
    email: "Cat_Bus@gmail.com",
    imageUrl:
      "https://cdn.vox-cdn.com/thumbor/gt_z0ExHHmCsLdHBSOxsMtuNSEo=/0x0:2048x1025/1200x800/filters:focal(770x330:1096x656)/cdn.vox-cdn.com/uploads/chorus_image/image/66875564/CatBus.0.jpg",
  },
];

const friends = [
  {
    nickname: "my love",
    firstName: "Sophie",
    lastName: "Hatter",
    imageUrl:
      "https://cdn.costumewall.com/wp-content/uploads/2017/09/sophie-hatter.jpg",
  },
  {
    nickname: "Princey",
    firstName: "Prince",
    lastName: "Ashitaka",
    imageUrl:
      "https://i.pinimg.com/originals/b7/d9/a0/b7d9a06ed4af82e9e6896ffd708dff55.jpg",
  },
  {
    nickname: "Jiro",
    firstName: "Jiro",
    lastName: "Horikoshi",
    imageUrl:
      "https://comicvine.gamespot.com/a/uploads/original/11/111746/4346533-jiro-horikoshi-the-wind-rises-24395-1680x1050.jpg",
  },
  {
    nickname: "Piggy",
    firstName: "Porco",
    lastName: "Rosso",
    imageUrl:
      "https://cdn.vox-cdn.com/thumbor/Ewo6PKQSzJshpFhv5U_kwrCkXb0=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/20009856/Porco_Rosso_963064296_large.jpg",
  },
  {
    nickname: "robo",
    firstName: "Laputian",
    lastName: "Robot",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFVq9TVZH_hjDqNaG_Isrwim6xOSqyEyxZDVyRGP9TxeA1VfuT-fm5N5fKAYvCs2WE5zg&usqp=CAU",
  },
];

const contacts = [
  {
    title: "Hello my love!",
    date: "2021-07-08",
    content: "looooooooooooooove",
  },
  {
    title: "Banana",
    date: "2021-09-01",
    content: "bananaaaaaaaaaaa",
  },
  {
    title: "Apples",
    date: "2020-11-11",
    content: "aaaaaappleeeeeeees",
  },
  {
    title: "Woah",
    date: "2021-06-03",
  },
  {
    title: "Cheese",
    content: "cheeeeeeeeeeeeeeeeeese",
    date: "2021-03-24",
  },
  {
    title: "Groceries",
    date: "2021-02-27",
  },
  {
    title: "Word association",
    date: "2021-04-16",
  },
  {
    title: "Mango juice",
    date: "2021-05-30",
  },
  {
    title: "Jamba Juice",
    date: "2019-12-11",
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    const newUsers = await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );

    const newFriends = await Promise.all(
      friends.map((friend) => {
        return Friend.create(friend);
      })
    );

    const newContacts = await Promise.all(
      contacts.map((contact) => {
        return Contact.create(contact);
      })
    );

    await newFriends[0].setUser(newUsers[0]);
    await newContacts[0].setUser(newUsers[0]);
    await newContacts[0].setFriend(newFriends[0]);
    await newContacts[6].setUser(newUsers[0]);
    await newContacts[6].setFriend(newFriends[0]);
    await newContacts[7].setUser(newUsers[0]);
    await newContacts[7].setFriend(newFriends[0]);

    await newFriends[2].setUser(newUsers[0]);
    await newContacts[2].setUser(newUsers[0]);
    await newContacts[2].setFriend(newFriends[2]);

    await newFriends[1].setUser(newUsers[0]);
    await newContacts[1].setUser(newUsers[0]);
    await newContacts[1].setFriend(newFriends[1]);
    await newContacts[8].setUser(newUsers[0]);
    await newContacts[8].setFriend(newFriends[1]);

    await newFriends[2].setUser(newUsers[1]);
    await newContacts[3].setUser(newUsers[1]);
    await newContacts[3].setFriend(newFriends[2]);

    await newFriends[3].setUser(newUsers[2]);
    await newContacts[4].setUser(newUsers[2]);
    await newContacts[4].setFriend(newFriends[3]);
    await newContacts[5].setUser(newUsers[2]);
    await newContacts[5].setFriend(newFriends[3]);

    await newFriends[4].setUser(newUsers[2]);
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green("Seeding success!"));
      db.close();
    })
    .catch((err) => {
      console.error(red("Oh noes! Something went wrong!"));
      console.error(err);
      db.close();
    });
}
