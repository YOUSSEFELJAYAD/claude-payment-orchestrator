def generate_react_form(component_name):
    """
    Generates a basic Shadcn Form structure string.
    """
    return f"""
import {{ useForm }} from "react-hook-form"
import {{ zodResolver }} from "@hookform/resolvers/zod"
import * as z from "zod"
import {{ Button }} from "@/components/ui/button"
import {{
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
}} from "@/components/ui/form"
import {{ Input }} from "@/components/ui/input"

const formSchema = z.object({{
  cardNumber: z.string().min(16).max(19),
}})

export function {component_name}() {{
  const form = useForm<z.infer<typeof formSchema>>({{
    resolver: zodResolver(formSchema),
  }})

  function onSubmit(values: z.infer<typeof formSchema>) {{
    console.log(values)
  }}

  return (
    <Form {{...form}}>
      <form onSubmit={{form.handleSubmit(onSubmit)}} className="space-y-8">
        <FormField
          control={{form.control}}
          name="cardNumber"
          render={{({{ field }}) => (
            <FormItem>
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input placeholder="Card Number" {{...field}} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}}
        />
        <Button type="submit">Pay</Button>
      </form>
    </Form>
  )
}}
"""

if __name__ == "__main__":
    print(generate_react_form("PaymentForm"))
