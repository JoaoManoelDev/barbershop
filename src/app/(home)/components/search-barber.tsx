"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useRouter } from "next/navigation"

const formSchema = z.object({
  search: z
    .string({
      required_error: "Campo obrigatório.",
    })
    .trim()
    .min(1, "Campo obrigatório."),
})

interface SearchProps {
  defaultValues?: z.infer<typeof formSchema>
}

export const SearchBarber = ({ defaultValues }: SearchProps) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershop?search=${data.search}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Form {...form}>
        <form
          className="flex w-full gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Busque por uma barbearia..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            <Icons.search className="w-4 h-4" />
          </Button>
        </form>
      </Form>
    </div>
  )
}
