const { Events, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { QueueRepeatMode, useQueue } = require("discord-player");
const wait = require('node:timers/promises').setTimeout;
let queuePlus = 1
let botaoListar = [0, 1]
let finalString
let modeCount = 0
let mode = QueueRepeatMode.OFF
let modeName = 'Off'
module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isButton()) {
            if (interaction.message.interaction.commandName === 'play') {
                let embed = new EmbedBuilder()
                const rowPause = new ActionRowBuilder()
                    .addComponents( // pause
                        new ButtonBuilder()
                            .setCustomId('pause')
                            .setLabel(' ')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji({
                                id: '1063983744316342324',
                                name: 'pause'
                            })
                    )
                    .addComponents( // next
                        new ButtonBuilder()
                            .setCustomId('next')
                            .setLabel(' ')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji({
                                id: '1063983749450190858',
                                name: 'next'
                            })
                    )
                    .addComponents( // stop
                        new ButtonBuilder()
                            .setCustomId('stop')
                            .setLabel(' ')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji({
                                id: '1063983737362206800',
                                name: 'stop'
                            })
                    )
                    .addComponents( //repeat
                        new ButtonBuilder()
                            .setCustomId('repeat')
                            .setLabel(' ')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji({
                                id: '1064629351594852492',
                                name: 'repeat'
                            })
                    )
                    .addComponents( // queue
                        new ButtonBuilder()
                            .setCustomId('queue')
                            .setLabel(' ')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji({
                                id: '1063983740457599021',
                                name: 'info'
                            })
                    )
                const rowPlay = new ActionRowBuilder()
                    .addComponents( // play
                        new ButtonBuilder()
                            .setCustomId('play')
                            .setLabel(' ')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji({
                                id: '1063983745696280608',
                                name: 'play'
                            })
                    )
                    .addComponents( // next
                        new ButtonBuilder()
                            .setCustomId('next')
                            .setLabel(' ')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji({
                                id: '1063983749450190858',
                                name: 'next'
                            })
                    )
                    .addComponents( // stop
                        new ButtonBuilder()
                            .setCustomId('stop')
                            .setLabel(' ')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji({
                                id: '1063983737362206800',
                                name: 'stop'
                            })
                    )
                    .addComponents( // repeat
                        new ButtonBuilder()
                            .setCustomId('repeat')
                            .setLabel(' ')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji({
                                id: '1064629351594852492',
                                name: 'repeat'
                            })
                    )
                    .addComponents( // queue
                        new ButtonBuilder()
                            .setCustomId('queue')
                            .setLabel(' ')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji({
                                id: '1063983740457599021',
                                name: 'info'
                            })
                    )
                const rowQueue = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('previousPage')
                            .setLabel(' ')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji({
                                id: '1063983741925605417',
                                name: 'leftarrow'
                            })
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('nextPage')
                            .setLabel(' ')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji({
                                id: '1063983748082831461',
                                name: 'rightarrow'
                            })
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('closeQueue')
                            .setLabel(' ')
                            .setStyle(ButtonStyle.Secondary)
                            .setEmoji({
                                id: '1063983751056597032',
                                name: 'x'
                            })
                    )

                if (interaction.customId === 'pause') {
                    const queue = useQueue(interaction.guild.id)
                    if (!queue || !queue.currentTrack)
                        return void interaction.update({
                            embeds: [new EmbedBuilder()
                                .setDescription(`Sem músicas na fila`)],
                        })

                    const currentTrack = queue.currentTrack
                    const author = currentTrack.author; // Autor da faixa
                    const title = currentTrack.title;   // Título da faixa
                    const thumbnail = currentTrack.thumbnail; // URL da thumbnail da faixa
                    const duration = currentTrack.duration;   // Duração da faixa (formato string)

                    const success = queue.node.pause()

                    embed
                        .setDescription(success ? `\u{23F8} Atualmente pausado | **${title}** | ${modeName} \n\n **${author}**` : 'Algo deu errado!')
                        .setThumbnail(thumbnail)
                        .setFooter({ text: `Duração: ${duration}` })

                    return void interaction.update({
                        embeds: [embed],
                        components: [rowPlay]
                    })

                }

                if (interaction.customId === 'play') {
                    const queue = useQueue(interaction.guild.id)
                    if (!queue || !queue.currentTrack)
                        return void interaction.update({
                            embeds: [new EmbedBuilder()
                                .setDescription(`Sem músicas na fila`)],
                        })

                    const currentTrack = queue.currentTrack
                    const author = currentTrack.author; // Autor da faixa
                    const title = currentTrack.title;   // Título da faixa
                    const thumbnail = currentTrack.thumbnail; // URL da thumbnail da faixa
                    const duration = currentTrack.duration;   // Duração da faixa (formato string)

                    const success = queue.node.resume()

                    embed
                        .setDescription(success ? `\u{23F5} Atualmente tocando | **${title}** | ${modeName} \n\n **${author}**` : 'Algo deu errado!')
                        .setThumbnail(thumbnail)
                        .setFooter({ text: `Duração: ${duration}` })

                    return void interaction.update({
                        embeds: [embed],
                        components: [rowPause]
                    })
                }

                if (interaction.customId === 'stop') {
                    const queue = useQueue(interaction.guild.id)
                    queue.setRepeatMode(QueueRepeatMode.OFF)
                    queue.node.stop()

                    if (!queue || !queue.currentTrack)
                        return void interaction.update({
                            embeds: [new EmbedBuilder()
                                .setDescription('Não tem música sendo reproduzida')]
                        });

                    interaction.update({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`A lista de reprodução foi limpa. Adicione músicas usando **/play**`)
                        ],
                        components: []
                    })
                }

                if (interaction.customId === 'next') {
                    const queue = useQueue(interaction.guild.id)
                    if (!queue || !queue.currentTrack)
                        return void interaction.update({
                            embeds: [new EmbedBuilder()
                                .setDescription('Não tem música sendo reproduzida')]
                        });

                    const skipedTrack = queue.currentTrack;
                    const success = queue.node.skip()

                    interaction.update({
                        embeds: [new EmbedBuilder()
                            .setDescription(
                                success ? `✅ | **${skipedTrack}** pulada` : '❌ | Algo deu errado!'
                            )
                        ]
                    })
                    await wait(3500)
                    const currentTrack = queue.currentTrack
                    const author = currentTrack.author; // Autor da faixa
                    const title = currentTrack.title;   // Título da faixa
                    const thumbnail = currentTrack.thumbnail; // URL da thumbnail da faixa
                    const duration = currentTrack.duration;   // Duração da faixa (formato string)

                    embed
                        .setDescription(`**▶ Atualmente tocando ${title}** | ${modeName} \n\n **${author}**`)
                        .setThumbnail(thumbnail)
                        .setFooter({ text: `Duração: ${duration}` })

                    interaction.editReply({
                        embeds: [embed],
                        components: [rowPause]
                    });
                }

                if (interaction.customId === 'repeat') { // repeat mode 1 = musica
                    modeCount++

                    const queue = useQueue(interaction.guild.id)
                    const currentTrack = queue.currentTrack
                    const author = currentTrack.author; // Autor da faixa
                    const title = currentTrack.title;   // Título da faixa
                    const thumbnail = currentTrack.thumbnail; // URL da thumbnail da faixa
                    const duration = currentTrack.duration;   // Duração da faixa (formato string)

                    if (modeCount == 1) {
                        mode = QueueRepeatMode.QUEUE
                        modeName = ' | \u{1F501}'
                    } else if (modeCount == 2) {
                        mode = QueueRepeatMode.TRACK
                        modeName = ` | \u{1F502}`
                    } else if (modeCount == 3) {
                        mode = QueueRepeatMode.AUTOPLAY
                        modeName = ' | AutoPlay'
                    } else if (modeCount == 4) {
                        mode = QueueRepeatMode.OFF
                        modeCount = 0
                        modeName = ''
                    }

                    queue.setRepeatMode(mode)
                    embed
                        .setDescription(`\u{23F5} Atualmente tocando **${title}** ${modeName} \n\n **${author}**`)
                        .setThumbnail(thumbnail)
                        .setFooter({ text: `Duração: ${duration}` })

                    interaction.update({
                        embeds: [embed],
                        components: [rowPause]
                    })
                }

                if (interaction.customId === 'queue') {
                    const queue = useQueue(interaction.guild.id)
                    if (typeof (queue) != 'undefined') {
                        const trimString = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
                        return void interaction.update({
                            embeds: [
                                {
                                    title: 'Now Playing',
                                    description: trimString(`The Current song playing is 🎶 | **${queue.currentTrack.title}**! \n 🎶 | ${queue}! `, 4095),
                                }
                            ],
                            components: [rowPause]
                        })
                    } else {
                        return void interaction.update({
                            description: 'Sem música na fila'
                        })
                    }
                }

                if (interaction.customId === 'closeQueue') {
                    const queue = useQueue(interaction.guild.id)
                    if (!queue || !queue.currentTrack)
                        return void interaction.update({
                            embeds: [new EmbedBuilder()
                                .setDescription(`Sem músicas na fila`)],
                        })

                    const currentTrack = queue.currentTrack
                    const author = currentTrack.author; // Autor da faixa
                    const title = currentTrack.title;   // Título da faixa
                    const thumbnail = currentTrack.thumbnail; // URL da thumbnail da faixa
                    const duration = currentTrack.duration;   // Duração da faixa (formato string)

                    const success = queue.node.resume()

                    embed
                        .setDescription(success ? `\u{23F5} Atualmente tocando | **${title}** | ${modeName} \n\n **${author}**` : 'Algo deu errado!')
                        .setThumbnail(thumbnail)
                        .setFooter({ text: `Duração: ${duration}` })

                    return void interaction.update({
                        embeds: [embed],
                        components: [rowPause]
                    })
                }
            }
        }
    },
};