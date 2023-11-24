/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Posts').del();
  await knex('Posts').insert([
    {
      id: 1,
      title: 'The Impact of AI on Healthcare: Revolutionizing Patient Care',
      content: 'lorem ipsum',
      image: 'https://shorturl.at/mnruB',
      userId: '1',
    },
    {
      id: 2,
      title: 'Exploring the Ethical Implications of AI in Decision-Making',
      content: 'lorem ipsum',
      image: 'https://shorturl.at/EIX17',
      userId: '1',
    },
    {
      id: 3,
      title: 'AI in Finance: How Automated Trading is Changing the Game',
      content: 'lorem ipsum',
      image: 'https://shorturl.at/EIX17',
      userId: '1',
    },
    {
      id: 4,
      title: 'AI and Creativity: Can Machines Be Truly Creative?',
      content: 'lorem ipsum',
      image: 'https://shorturl.at/mnruB',
      userId: '2',
    },
    {
      id: 5,
      title: 'AI and Creativity: Can Machines Be Truly Creative?',
      content: 'lorem ipsum',
      image: 'https://shorturl.at/mnruB',
      userId: '3',
    },
  ]);
};
