const { MessageActionRow, Client, MessageEmbed, Permissions, MessageAttachment, MessageButton } = require('discord.js');
const client = new Client({intents: 3276799});
const dayjs = require('dayjs');
var cron = require('node-cron');
const axios = require('axios').default;

const { botToken, date } = require('./config.json');

client.on('ready', async () => {
    client.user.setPresence({
        status: 'online',
        activities: [{
            name: `for when she is coming back...`,
            type: 'WATCHING'
        }]
    });
    setUp();
});

async function setUp(){
    let dateTo = dayjs(date);
    let hours = Math.floor(dateTo.diff(dayjs(), 'hour'));
    let days = Math.floor(hours/24).toFixed()
    let mins = Math.floor(dateTo.diff(dayjs(), 'minute') - (hours*60));
    hours = Math.floor(hours - (days*24))
    console.log(days, hours, mins)
    let daysChannel = client.guilds.cache.get("997422341623664640").channels.resolve('997422726190997635');
    let hoursChannel = client.guilds.cache.get("997422341623664640").channels.resolve('997422942357049374');
    let minsChannel = client.guilds.cache.get("997422341623664640").channels.resolve('997428433330131014');
    let backDaysChannel = client.guilds.cache.get("997422341623664640").channels.resolve('997489610735239208');
    let backHoursChannel = client.guilds.cache.get("997422341623664640").channels.resolve('997489639768211546');
    let backMinsChannel = client.guilds.cache.get("997422341623664640").channels.resolve('997489665890328696');
    let lastCheckChannel = client.guilds.cache.get("997422341623664640").channels.resolve('997429198727680061');
    let checkChannel = client.guilds.cache.get("997422341623664640").channels.resolve('997422342793863172');
    daysChannel.setName(`Days: ${days}`);
    hoursChannel.setName(`Hours: ${hours}`);
    minsChannel.setName(`Minutes: ${mins}`);
    backDaysChannel.setName(`Days: ${days}`);
    backHoursChannel.setName(`Hours: ${hours}`);
    backMinsChannel.setName(`Minutes: ${mins}`);
    lastCheckChannel.setName(`${dayjs().format('DD/MM/YYYY HH:mm')}`);
    checkChannel.edit({ topic: `She's coming back in ${days} days, ${hours} hours and ${mins} minutes...` });
    const catUrl = await axios.get(`https://api.thecatapi.com/v1/images/search`).then(function (response) { return response.data[0].url; })
    const embed = new MessageEmbed()
        .setColor('LUMINOUS_VIVID_PINK')
        .setTitle(`When is she coming back?`)
        .setThumbnail('https://cdn3.iconfinder.com/data/icons/miniglyphs/500/041-512.png')
        .setDescription(`> **${days} day(s)**\n> **${hours} hour(s)**\n> **${mins} minute(s)**\n`)
        .setImage(catUrl)
    checkChannel.send({
        content: `<@852604404128940152>`,
        embeds: [embed]
    })
}

const job = cron.schedule('0 */1 * * *', async () => setUp());
job.start();

client.login(botToken);