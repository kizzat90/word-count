import ForgeUI, { render, Fragment, Macro, Text, TextArea, Form, useState, RadioGroup, Radio, SectionMessage, Table, Head, Cell, Row, useEffect } from "@forge/ui";

const App = () => { 
  const [input, setInput] = useState("");
  const [wordMap, setWordMap] = useState(new Map());
  const [mapSize, setMapSize] = useState(0);

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

    //BUG: Sort is not working (WIP)
    if(sort === "sortWord")
    {
      if(order === "OrderByAscending")
      {
        Object.keys(...map).sort((a, b) => a - b);
      }
      else if(order === "OrderByDescending")
      {
        Object.keys(...map).sort((a, b) => b - a);
      }
    }
    else if(sort === "sortCount")
    {
      if(order === "OrderByAscending")
      {
        Object.values(...map).sort((a,b) =>  a - b);
      }
      else if(order === "OrderByDescending")
      {
        Object.values(...map).sort((a,b) =>  b - a);
      }
    }

    //Sets values into useState
    setInput(formDataInput);
    setWordMap(map);
    setMapSize(map.size);
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
          <Radio defaultChecked label="Ascending" name="ascending" value="OrderByAscending"></Radio>
          <Radio label="Descending" name="descending" value="OrderByDescending"></Radio>
        </RadioGroup>
      </Form>
      <SectionMessage title="You entered:" appearance="confirmation">
        <Text>{input}</Text>
        <Text>{mapSize}</Text>
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


