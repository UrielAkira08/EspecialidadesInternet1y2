
import React, { useState } from 'react';
import { Section, ContentItem, ContentItemType, Definition, DefinitionGroup, TextBlock, ListItem, HtmlExample, HtmlTableExample, TaskGroup, MemorizeVerse, SubHeading, QuestionAnswerItem, ImageItem } from '../types';

const ExternalLinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 ml-1 inline-block"><path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" /><path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 transition-transform duration-300"><path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>;
const ChevronUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 transition-transform duration-300"><path fillRule="evenodd" d="M14.78 11.78a.75.75 0 01-1.06 0L10 8.06l-3.72 3.72a.75.75 0 11-1.06-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06z" clipRule="evenodd" /></svg>;


const DefinitionItemDisplay: React.FC<{ def: Definition, id: string }> = ({ def, id }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="p-3 bg-sky-50 rounded-md border border-sky-200">
      <div 
        className="flex justify-between items-center cursor-pointer group" 
        onClick={() => setIsRevealed(!isRevealed)}
        aria-expanded={isRevealed}
        aria-controls={`content-${id}`}
      >
        <h5 className="font-semibold text-sky-800 group-hover:text-sky-600 transition-colors">{def.term}</h5>
        {isRevealed ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </div>
      <div 
        id={`content-${id}`}
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isRevealed ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-sm text-slate-700 pt-1">{def.description}</p>
        {def.example && <p className="text-xs text-slate-500 mt-1 italic">Ej: {def.example}</p>}
      </div>
    </div>
  );
};

const QuestionAnswerItemDisplay: React.FC<{ qaItem: QuestionAnswerItem, id: string, level: number }> = ({ qaItem, id, level }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className={`py-2 ${level > 0 ? 'ml-4 pl-4 border-l border-slate-200' : ''}`}>
      <div 
        className="flex justify-between items-center cursor-pointer group" 
        onClick={() => setIsRevealed(!isRevealed)}
        aria-expanded={isRevealed}
        aria-controls={`content-${id}`}
      >
        <h5 className={`font-semibold group-hover:text-sky-600 transition-colors ${level > 0 ? 'text-md' : 'text-lg'} text-sky-800`}>{qaItem.question}</h5>
        {isRevealed ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </div>
      <div
        id={`content-${id}`}
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isRevealed ? 'max-h-screen opacity-100 mt-1' : 'max-h-0 opacity-0'}`} // max-h-screen for potentially longer answers
      >
        <p className="text-sm text-slate-700 mt-1 whitespace-pre-line pt-1">{qaItem.answer}</p>
        {qaItem.subItems && qaItem.subItems.length > 0 && (
          <div className="mt-2">
            {qaItem.subItems.map((subItem, index) => (
              <QuestionAnswerItemDisplay key={`${id}-sub-${index}`} qaItem={subItem} id={`${id}-sub-${index}`} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


const ContentItemDisplay: React.FC<{ item: ContentItem }> = ({ item }) => {
  switch (item.type) {
    case ContentItemType.DEFINITION_GROUP:
      const defGroup = item.content as DefinitionGroup;
      return (
        <div className="space-y-3">
          {item.title && <h4 className="text-lg font-semibold text-sky-700 mt-4 mb-2">{item.title}</h4>}
          {defGroup.items.map((def, index) => (
            <DefinitionItemDisplay key={`${item.id}-def-${index}`} def={def} id={`${item.id}-def-${index}`} />
          ))}
        </div>
      );
    case ContentItemType.TEXT_BLOCK:
      const textBlock = item.content as TextBlock;
      return (
        <div className="my-3">
          {item.title && <h4 className="text-lg font-semibold text-sky-700 mb-2">{item.title}</h4>}
          <p className={`text-slate-700 whitespace-pre-line ${textBlock.isBold ? 'font-bold' : ''} ${textBlock.isCentered ? 'text-center' : ''}`}>{textBlock.text}</p>
        </div>
      );
    case ContentItemType.LIST:
      const listContent = item.content as { items: ListItem[] };
      const renderListItems = (items: ListItem[], level: number = 0) => (
        <ul className={`${level > 0 ? 'ml-5' : ''} list-disc space-y-1 pl-5`}>
          {items.map((listItem, index) => (
            <li key={`${item.id}-li-${index}`} className={`${listItem.isBold ? 'font-semibold' : ''} text-slate-700`}>
              {listItem.text}
              {listItem.subItems && listItem.subItems.length > 0 && renderListItems(listItem.subItems, level + 1)}
            </li>
          ))}
        </ul>
      );
      return (
         <div className="my-3">
            {item.title && <h4 className="text-lg font-semibold text-sky-700 mb-2">{item.title}</h4>}
            {renderListItems(listContent.items)}
        </div>
      );
    case ContentItemType.HTML_EXAMPLE:
    case ContentItemType.HTML_TABLE_EXAMPLE:
      const htmlExample = item.content as HtmlExample | HtmlTableExample;
      return (
        <div className="my-4 p-4 border border-slate-300 rounded-lg bg-slate-50">
          {item.title && <h4 className="text-xl font-semibold text-sky-700 mb-3">{item.title}</h4>}
          {htmlExample.title && <h5 className="text-lg font-medium text-sky-600 mb-2">{htmlExample.title}</h5>}
          <h6 className="text-sm font-semibold text-slate-600 mb-1">Código HTML:</h6>
          <pre className="bg-slate-900 text-white p-3 rounded-md text-xs overflow-x-auto custom-scrollbar">
            <code>{htmlExample.code}</code>
          </pre>
          {htmlExample.explanation && <p className="text-sm text-slate-600 mt-3 mb-3">{htmlExample.explanation}</p>}
          <div className="mt-3">
            <h6 className="text-sm font-semibold text-slate-600 mb-1">Resultado en vivo:</h6>
            <iframe
              srcDoc={htmlExample.code}
              title={htmlExample.title || "Resultado del ejemplo HTML"}
              className="w-full h-72 border border-slate-400 rounded bg-white"
              sandbox="allow-scripts allow-popups allow-forms" // Allows scripts for dynamic examples, and forms/popups if needed by example code.
            />
          </div>
        </div>
      );
    case ContentItemType.TASK_GROUP:
      const taskGroup = item.content as TaskGroup;
      return (
        <div className="my-4">
          {item.title && <h4 className="text-lg font-semibold text-sky-700 mb-2">{item.title}</h4>}
          {taskGroup.items.map((task, index) => (
            <div key={`${item.id}-task-${index}`} className="p-3 mb-3 bg-amber-50 border border-amber-300 rounded-md">
              <p className="font-semibold text-amber-800">{task.description}</p>
              {task.details && (
                <ul className="list-disc pl-5 mt-1 space-y-0.5">
                  {task.details.map((detail, i) => <li key={i} className="text-sm text-slate-700">{detail}</li>)}
                </ul>
              )}
              {task.resources && task.resources.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-medium text-slate-600">Recursos:</p>
                  <ul className="list-none pl-0 space-y-0.5">
                    {task.resources.map((res, i) => (
                      <li key={i}>
                        <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-xs text-sky-600 hover:text-sky-800 hover:underline">
                          {res.text} <ExternalLinkIcon />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    case ContentItemType.MEMORIZE_VERSE:
      const verse = item.content as MemorizeVerse;
      return (
        <div className="my-4 p-4 bg-green-50 border border-green-300 rounded-lg text-center">
          {item.title && <h4 className="text-lg font-semibold text-green-700 mb-2">{item.title}</h4>}
          <p className="text-md font-semibold text-green-800">{verse.reference}</p>
          <blockquote className="mt-2 text-slate-700 italic">"{verse.text}"</blockquote>
          {verse.commentary && <p className="text-sm text-slate-600 mt-3">{verse.commentary}</p>}
        </div>
      );
    case ContentItemType.SUB_HEADING:
        const subHeading = item.content as SubHeading;
        return <h3 className="text-xl font-semibold text-sky-700 mt-6 mb-3 border-b border-sky-200 pb-1">{subHeading.text}</h3>;
    case ContentItemType.QUESTION_ANSWER:
        const qaContent = item.content as { items: QuestionAnswerItem[] };
        return (
            <div className="my-3 space-y-1">
                {item.title && <h4 className="text-lg font-semibold text-sky-700 mb-2">{item.title}</h4>}
                {qaContent.items.map((qaItem, index) => (
                    <QuestionAnswerItemDisplay key={`${item.id}-qa-${index}`} qaItem={qaItem} id={`${item.id}-qa-${index}`} level={0} />
                ))}
            </div>
        );
    case ContentItemType.IMAGE:
        const imgItem = item.content as ImageItem;
        return (
            <div className="my-4 text-center">
                <img src={imgItem.src} alt={imgItem.alt} className="max-w-full h-auto mx-auto rounded-md shadow-sm border border-slate-200" />
                {imgItem.caption && <p className="text-xs text-slate-500 mt-2 italic">{imgItem.caption}</p>}
            </div>
        );
    default:
      return <div className="text-red-500">Tipo de contenido no reconocido: {item.type}</div>;
  }
};

const ContentRenderer: React.FC<{ sections: Section[] }> = ({ sections }) => {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <section key={section.id} className="scroll-mt-20" id={section.id}>
          <h2 className="text-2xl sm:text-3xl font-bold text-sky-800 mb-3 border-b-2 border-sky-300 pb-2">
            {section.title}
          </h2>
          {section.introduction && <p className="text-md text-slate-600 mb-6 italic">{section.introduction}</p>}
          <div className="space-y-6">
            {section.items.map((item) => (
              <ContentItemDisplay key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ContentRenderer;