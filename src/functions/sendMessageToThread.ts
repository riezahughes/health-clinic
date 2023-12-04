import { ThreadChannel, ModalSubmitInteraction } from "discord.js"
import { reply } from "../templates"
import sendMessageToGPT from "./gpt/sendMessagetoGPT"
import { PrismaClient } from "@prisma/client"

const sendMessageToThread = async (
  interaction: ModalSubmitInteraction,
  prisma: PrismaClient,
  channel: ThreadChannel,
  alias: string
) => {
  const value = interaction.fields.getTextInputValue("replyInput")

  const replyInteraction = await interaction.reply({
    ephemeral: true,
    content: "On its way!"
  })

  const msg = await sendMessageToGPT(value)

  const json = reply(msg, alias)

  const newPost = await channel.send(json)

  await replyInteraction.edit("`Message Sent!`")

  return newPost
}

export default sendMessageToThread
