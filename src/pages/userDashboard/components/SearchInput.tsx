import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useSortAndFilter } from "@/contexts/SortContext";

const FormSchema = z.object({
  search: z.string(),
});
const SearchInput = ({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { setSearch } = useSortAndFilter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setPage(1);
    setSearch(data.search);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Search name, email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary" className="cursor-pointer">
          <Search />
        </Button>
      </form>
    </Form>
  );
};

export default SearchInput;
