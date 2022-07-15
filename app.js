require('dotenv').config();
const { MessageActionRow, Client, MessageEmbed, Permissions, MessageAttachment, MessageButton } = require('discord.js');
const client = new Client({intents: 3276799});
const dayjs = require('dayjs');
var cron = require('node-cron');
const axios = require('axios').default;

const cfg = require('./config');

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
    let dateToMeet = dayjs(cfg.dateMeet);
    let hoursToMeet = Math.floor(dateToMeet.diff(dayjs(), 'hour'));
    let daysToMeet = Math.floor(hoursToMeet/24).toFixed();
    hoursToMeet = Math.floor(hoursToMeet - (daysToMeet*24));
    let minsToMeet = Math.floor(dateToMeet.diff(dayjs(), 'minute') - (hoursToMeet*60));
    minsToMeet = Math.floor(minsToMeet - ((daysToMeet*24)*60));

    let dateToComeback = dayjs(cfg.dateComeback);
    let hoursToComeback = Math.floor(dateToComeback.diff(dayjs(), 'hour'));
    let daysToComeback = Math.floor(hoursToComeback/24).toFixed();
    hoursToComeback = Math.floor(hoursToComeback - (daysToComeback*24));
    let minsToComeback = Math.floor(dateToComeback.diff(dayjs(), 'minute') - (hoursToComeback*60));
    minsToComeback = Math.floor(minsToComeback - ((daysToComeback*24)*60));

    let dateNow = dayjs().add(2, 'hour')

    client.guilds.cache.get(cfg.serverId).channels.resolve(cfg.channels.daysChannel).setName(`◈ ${daysToMeet} day(s)`);
    client.guilds.cache.get(cfg.serverId).channels.resolve(cfg.channels.hoursChannel).setName(`◈ ${hoursToMeet} hour(s)`);
    client.guilds.cache.get(cfg.serverId).channels.resolve(cfg.channels.minsChannel).setName(`◈ ${minsToMeet} minute(s)`);
    client.guilds.cache.get(cfg.serverId).channels.resolve(cfg.channels.backDaysChannel).setName(`◈ ${daysToComeback} day(s)`);
    client.guilds.cache.get(cfg.serverId).channels.resolve(cfg.channels.backHoursChannel).setName(`◈ ${hoursToComeback} hour(s)`);
    client.guilds.cache.get(cfg.serverId).channels.resolve(cfg.channels.backMinsChannel).setName(`◈ ${minsToComeback} minute(s)`);
    client.guilds.cache.get(cfg.serverId).channels.resolve(cfg.channels.lastCheckChannel).setName(`${dateNow.format('DD/MM/YYYY HH:mm')}`);
    const checkChannel = client.guilds.cache.get(cfg.serverId).channels.resolve(cfg.channels.checkChannel);
    checkChannel.edit({ topic: `**◈ She's coming back in ${daysToComeback} day(s), ${hoursToComeback} hour(s) and ${minsToComeback} minute(s)...**` });
    // const catUrl = await axios.get(`https://api.thecatapi.com/v1/images/search`).then(function (response) { return response.data[0].url; })
    const embed = new MessageEmbed()
        .setColor('LUMINOUS_VIVID_PINK')
        .setThumbnail('https://cdn3.iconfinder.com/data/icons/miniglyphs/500/041-512.png')
        .setDescription(`**When is she coming back?**\n> ◈ **${daysToComeback} day(s)**\n> ◈ **${hoursToComeback} hour(s)**\n> ◈ **${minsToComeback} minute(s)**\n\n**When will we meet?**\n> ◈ **${daysToMeet} day(s)**\n> ◈ **${hoursToMeet} hour(s)**\n> ◈ **${minsToMeet} minute(s)**`)
        // .setImage(catUrl)

    checkChannel.send({
        content: `<@852604404128940152>`,
        embeds: [embed]
    })
}

const job = cron.schedule('0 */1 * * *', async () => setUp()); job.start();

client.login(process.env.botToken);