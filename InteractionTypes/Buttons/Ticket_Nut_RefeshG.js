const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require(`discord.js`)
const config = require(`../../config`)
const interactionError = require('../../Events/WebhookError/interactionError');
const ticket = require('../../schemas/ticketSchema');

module.exports = {
    id: 'Ticket_Nut_RefeshG',
    description: 'Nút này cho phép người dùng có ADM đặt lại số thứ tự của các kênh ticket game-, giúp quản lý các kênh vé một cách dễ dàng.',
    async execute(interaction, client) {
    try {

            if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                // Reset số thứ tự cho các kênh game-
                const data = await ticket.findOne({ Guild: interaction.guild.id });
                if (!data) return await interaction.reply({ content: `🚫 Dữ liệu hệ thống vé không tồn tại.`, ephemeral: true });

                data.currentGameTicketNumber = 0; // Đặt lại số thứ tự
                await data.save();

                await interaction.reply({ content: `✅ Đã làm mới số thứ tự kênh vé game.`, ephemeral: true });
            } else {
                await interaction.reply({ content: `🚫 Bạn không có quyền thực hiện thao tác này.`, ephemeral: true });
            }

        } catch (error) {
            interactionError.execute(interaction, error, client);
        }
    },
};