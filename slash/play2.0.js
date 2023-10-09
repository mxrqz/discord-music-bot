const { SlashCommandBuilder, ApplicationCommandOptionType } = require("@discordjs/builders")
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js")
const { QueryType, useMainPlayer } = require("discord-player");
const { CLIENT_ID } = require("../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("▶ Busca músicas no Youtube")
        .addStringOption((option) => option.setName("musica").setDescription("Pesquisa a música por url e nome").setRequired(true)),

    run: async ({ client, interaction }) => {
        let embed = new EmbedBuilder()
        try {
            await interaction.deferReply();
            const player = useMainPlayer()
            const query = interaction.options.getString('musica');
            const searchResult = await player.search(query)
            if (!searchResult.hasTracks())
                return void interaction.editReply({ content: 'No results were found!' });

            try {
                const res = await player.play(interaction.member.voice.channel.id, searchResult, {
                    nodeOptions: {
                        metadata: {
                            channel: interaction.channel,
                            client: interaction.guild?.members.me,
                            requestedBy: interaction.user.username
                        },
                        leaveOnEmptyCooldown: 300000,
                        leaveOnEmpty: true,
                        leaveOnEnd: false,
                        bufferingTimeout: 0,
                        volume: 50,
                        //defaultFFmpegFilters: ['lofi', 'bassboost', 'normalizer']
                    }
                });

                const title = searchResult.tracks[0].raw.title // ok
                let author // ok
                if (searchResult.tracks[0].raw.source == 'youtube') {
                    author = searchResult.tracks[0].raw.channel.name
                } else if (searchResult.tracks[0].raw.source == 'spotify') {
                    author = searchResult.tracks[0].raw.author
                } else {
                    author = 'author'
                }
                let thumbnail // ok
                if (searchResult.tracks[0].raw.source == 'youtube') {
                    thumbnail = searchResult.tracks[0].raw.thumbnail.url
                } else if (searchResult.tracks[0].raw.source == 'spotify') {
                    thumbnail = searchResult.tracks[0].raw.thumbnail
                } else {
                    thumbnail = 'thumbnail'
                }
                let duration // ok
                if (searchResult.tracks[0].raw.source == 'youtube') {
                    duration = searchResult.tracks[0].raw.durationFormatted
                } else if (searchResult.tracks[0].raw.source == 'spotify') {
                    duration = searchResult.tracks[0].raw.duration
                } else {
                    duration = 'duration'
                }

                const row = new ActionRowBuilder()
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

                embed
                    .setDescription(`**▶ ${title}** foi adicionado à fila \n \n **${author}**`)
                    .setThumbnail(thumbnail)
                    .setFooter({ text: `Duração: ${duration}` })

                await interaction.editReply({
                    embeds: [embed],
                    components: [row]
                });

            } catch (error) {
                await interaction.editReply({
                    content: 'An error has occurred!'
                })
                return console.log(error);
            }
        } catch (error) {
            await interaction.reply({
                content: 'There was an error trying to execute that command: ' + error.message,
            });
        }
    },
};