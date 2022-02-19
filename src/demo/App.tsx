import React, { useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Theme } from '../models/Theme';
import { TimelineItemModel } from '../models/TimelineItemModel';
import {
  HorizontalBasic, HorizontalInitalSelectedItem,
  VerticalBasic, VerticalBasicCardLess, VerticalCustomContent, VerticalCustomContent2, VerticalTree, VerticalTreeMixed
} from './app-samples';
import './App.css';
import {
  AppArea,
  ComponentLinks,
  Wrapper
} from './App.styles';
import data from './data';
import mixed from "./data-mixed";
import DynamicLoad from "./dynamic-load";

const NewDemo: React.FunctionComponent = () => {
  const [items, setItems] = useState<TimelineItemModel[]>([]);
  const [state, setState] = useState(0);

  const [customTheme, setCustomTheme] = useState<Theme>({
    cardBgColor: "#C0C0C0",
    primary: "#000",
    secondary: "#FFA500"
  });

  useEffect(() => {
    if (state > 0) {
      setCustomTheme({
        cardBgColor: "#efefef",
        primary: "#000",
        secondary: "#FFA500"
      })
    } else {
      setCustomTheme({
        cardBgColor: "#C0C0C0",
        primary: "#000",
        secondary: "#FFA500",
        titleColor: "#000"
      })
    }
  }, [state]);

  useEffect(() => {
    const newItems = data.map(
      ({ title, url, cardTitle, cardSubtitle, cardDetailedText, id, media }) => ({
        title,
        url,
        cardTitle,
        cardSubtitle,
        cardDetailedText,
        id,
        media
      }),
    );
    setItems(newItems);
    setTimeout(() => {
      const updatedItems = [{
        title: "February 2022", cardTitle: 'Dunkirk',
        url: 'http://www.history.com',
        media: {
          name: 'dunkirk beach',
          source: {
            url:
              'https://i2-prod.mirror.co.uk/incoming/article10847802.ece/ALTERNATES/s810/PAY-Dunkirk-in-colour.jpg',
          },
          type: 'IMAGE',
        },
        cardSubtitle:
          'Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.',
        // cardDetailedText: [`On 10 May 1940, Hitler began his long-awaited offensive in the west by invading neutral Holland and Belgium and attacking northern France.`, `Holland capitulated after only five days of fighting, and the Belgians surrendered on 28 May. With the success of the German ‘Blitzkrieg’, the British Expeditionary Force and French troops were in danger of being cut off and destroyed.`],
        cardDetailedText: [`On 10 May 1940, Hitler began his long-awaited offensive in the west by invading neutral Holland and Belgium and attacking northern France.`],
      }, ...newItems];
      setItems(updatedItems);
    }, 3000)
  }, []);


  return (
    <Wrapper>
      <BrowserRouter>
        <aside className="app-links">
          <ComponentLinks>
            <li>
              <Link to="/vertical-basic">Vertical Basic</Link>
            </li>
            <li>
              <Link to="/vertical-alternating">Vertical Alternating</Link>
            </li>
            <li>
              <Link to="/vertical-alternating-mixed">Vertical Alternating Mixed Data</Link>
            </li>
            <li>
              <Link to="/horizontal">Horizontal Basic</Link>
            </li>
            <li>
              <Link to="/horizontal-initial-select">Horizontal Basic with initial selected item</Link>
            </li>
            <li>
              <Link to="/vertical-custom">Vertical  Custom contents</Link>
            </li>
            <li>
              <Link to="/vertical-custom-icon">Vertical  Custom Icons</Link>
            </li>
            <li>
              <Link to="/dynamic-load">Dynamic data load</Link>
            </li>
            <li>
              <Link to="/timeline-without-cards">Timeline Card less</Link>
            </li>
            <li>
              <Link to="/timeline-without-cards-horizontal">Timeline Card less (Horizontal)</Link>
            </li>
          </ComponentLinks>
        </aside>
        <AppArea>
          <Routes>
            <Route path="/vertical-basic" element={items.length && <VerticalBasic type={"big-screen"} items={items} />}>
            </Route>
            <Route path="/vertical-alternating-mixed" element={items.length > 0 && <VerticalTreeMixed type={"big-screen"} />} >

            </Route>
            <Route path="/vertical-alternating" element={<>
              <button onClick={() => {
                setState(1 - state);
              }}>change</button>
              {<VerticalTree type={'big-screen'} items={state > 0 ? items : mixed} theme={customTheme} >{state}</VerticalTree>}

            </>}>
            </Route>
            <Route path="/horizontal" element={items.length > 0 && (
              <HorizontalBasic items={items} type="big-screen" />
            )}>

            </Route>
            <Route path="/horizontal-initial-select" element={items.length > 0 && (
              <HorizontalInitalSelectedItem items={items} type="big-screen" />
            )}>
            </Route>
            <Route path="/vertical-custom" element={items.length > 0 && <VerticalCustomContent type="big-screen" />}>
            </Route>
            <Route path="/vertical-custom-icon" element={items.length > 0 && <VerticalCustomContent2 type="big-screen" />}>
            </Route>
            <Route path="/dynamic-load" element={items.length > 0 && <DynamicLoad />}>
            </Route>
            <Route path="/timeline-without-cards" element={items.length > 0 && <VerticalBasicCardLess type='big-screen' items={items} />}>
            </Route>
            <Route path="/timeline-without-cards-horizontal" element={items.length > 0 && <VerticalBasicCardLess type='big-screen' items={items} />}>
            </Route>
            <Route path="/" element={items.length > 0 && (
              <VerticalBasic type={"big-screen"} items={items} />
            )}>
            </Route>
          </Routes>
        </AppArea>
      </BrowserRouter>
    </Wrapper>
  );
};

export default NewDemo;
