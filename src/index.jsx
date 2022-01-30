import ForgeUI, { render, Fragment, Macro, Text, TextArea, Form, useState, RadioGroup, Radio, SectionMessage, Table, Head, Cell, Row } from "@forge/ui";

const App = () => { 
  const [input, setInput] = useState("");
  const [wordMap, setWordMap] = useState(new Map());

  const onSubmit= async (formData) => {
    //Extracts all from formData
    const formDataInput = formData["input"];
    const wordArray = formDataInput.trim().toLowerCase().split(/\s+/);
    const map = new Map();
    const sort = formData["sort"];
    const order = formData["order"];

    //Begin inserting into map & counting words
    for(let i = 0; i < wordArray.length; i++) {
      if(map.has(wordArray[i]))
      {
        map.set(wordArray[i], map.get(wordArray[i]) + 1);
      }
      else
      {
        map.set(wordArray[i], 1);
      }
    }

    //Sorts by word or count, by ascending or descending order
    let sortedMap = new Map();
    if(sort === "sortWord")
    {
      if(order === "orderByAscending")
      {
        sortedMap = new Map([...map.entries()].sort());
      }
      else if(order === "orderByDescending")
      {
        sortedMap = new Map([...map.entries()].sort().reverse());
      }
    }
    else if(sort === "sortCount")
    {
      if(order === "orderByAscending")
      {
        sortedMap = new Map([...map.entries()].sort((a, b) => a[1] - b[1]));
      }
      else if(order === "orderByDescending")
      {
        sortedMap = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
      }
    }

    //Sets values into useState
    setInput(formDataInput);
    setWordMap(sortedMap);
  }


  return (
    <Fragment>
      <Form onSubmit={onSubmit} submitButtonText="Let's start counting!">
        <TextArea label="Your input field *" name="input"></TextArea>
        <RadioGroup label="Sort results by" name="sort">
          <Radio defaultChecked label="Word" name="word" value="sortWord"></Radio>
          <Radio label="Count" name="count" value="sortCount"></Radio>
        </RadioGroup>
        <RadioGroup label="Sort order by" name="order">
          <Radio defaultChecked label="Ascending" name="ascending" value="orderByAscending"></Radio>
          <Radio label="Descending" name="descending" value="orderByDescending"></Radio>
        </RadioGroup>
      </Form>
      <SectionMessage title="You entered:" appearance="confirmation">
        <Text>{input}</Text>
      </SectionMessage>
      <Table>
        <Head>
          <Cell>
            <Text>Word</Text>
          </Cell>
          <Cell>
            <Text>Count</Text>
          </Cell>
        </Head>
        {Array.from(wordMap).map( ([word, total]) => (
        <Row>
          <Cell>
            <Text>{word}</Text>
          </Cell>
          <Cell>
            <Text>{total}</Text>
          </Cell>
        </Row>
        ))}
      </Table>
    </Fragment>
  );
};


export const run = render(<Macro app={<App />} />);


