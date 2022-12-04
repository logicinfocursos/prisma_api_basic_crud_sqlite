import { PrismaClient } from '@prisma/client'



const prisma = new PrismaClient()



export default {



    async add(request, response) {

        try {
            const { name, email } = request.body

            let user = await prisma.user.findUnique({ where: { email } })

            if (user) return response.status(409).json({ error: 'já existe um usuário com esse email' })

            user = await prisma.user.create({
                data: {
                    name,
                    email,
                }
            })

            return response.status(200).json(user)

        } catch (error) {

            return response.status(500).json({ error })
        }
    },



    async list(request, response) {

        try {

            const users = await prisma.user.findMany()

            return response.json(users)

        } catch (error) {

            return response.status(500).json({ error })
        }
    },



    async find(request, response) {

        try {

            const { id } = request.params
            const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })

            if (!user) return response.status(404).json({ error: 'registro não encontrado!' })

            return response.status(200).json(user)


        } catch (error) {

            return response.status(500).json({ error })
        }
    },



    async update(request, response) {

        try {

            const { id } = request.params
            const { name, email } = request.body

            let user = await prisma.user.findUnique({ where: { id: parseInt(id) } })

            if (!user) return response.status(404).json({ error: 'registro não encontrado!' })

            user = await prisma.user.update({
                where: { id: parseInt(id) }, data: { name, email }
            })

            return response.status(200).json(user)

        } catch (error) {

            return response.json({ error })
        }
    },



    async delete(request, response) {

        try {

            const { id } = request.params
            const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })

            if (!user) return response.status(404).json({ message: 'registro não encontrado!' })

            await prisma.user.delete({ where: { id: parseInt(id) } })

            return response.status(200).json({ message: 'registro deletado!' })

        } catch (error) {

            return response.status(400).json({ error, message: 'ocorreu um erro ao se tentar deletar o registro!' })
        }
    },
}