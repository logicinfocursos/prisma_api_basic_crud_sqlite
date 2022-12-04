import { PrismaClient } from '@prisma/client'



const prisma = new PrismaClient()



export default {



    async add(request, response) {

        try {

            const { content } = request.body
            const { id } = request.params
            const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })

            if (!user) return response.status(404).json({ error: 'usuário não encontrado!' })

            const post = await prisma.post.create({
                data: {
                    content,
                    userId: user.id,
                },
                include: {
                    author: true,
                }
            })

            return response.status(200).json(post)

        } catch (error) {

            return response.status(500).json({ error })
        }
    },



    async list(request, response) {

        try {
            const posts = await prisma.post.findMany()

            return response.status(200).json(posts)

        } catch (error) {

            return response.status(500).json({ error })

        }
    },



    async find(request, response) {

        try {

            const { id } = request.params
            const post = await prisma.post.findUnique({ where: { id: parseInt(id) } })

            if (!post) return response.status(404).json({ error: 'registro não encontrado!' })

            return response.status(200).json(post)


        } catch (error) {

            return response.status(500).json({ error })
        }
    },



    async update(request, response) {

        try {

            const { id } = request.params
            const { content } = request.body

            let post = await prisma.post.findUnique({ where: { id: parseInt(id) } })

            if (!post) return response.status(404).json({ error: 'registro não encontrado!' })

            post = await prisma.post.update({
                where: { id: parseInt(id) },
                data: { content }
            })

            return response.status(200).json({ message: 'registro atualizado!' })

        } catch (error) {

            return response.status(500).json({ error })
        }
    },



    async delete(request, response) {

        try {

            const { id } = request.params
            const post = await prisma.post.findUnique({ where: { id: parseInt(id) } })

            if (!post) return response.status(404).json({ error: 'registro não encontrado!' })

            await prisma.post.delete({ where: { id: parseInt(id) } })

            return response.status(200).json({ message: 'registro deletado!' })

        } catch (error) {

            return response.status(500).json({ error })
        }
    },
}