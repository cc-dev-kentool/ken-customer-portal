// Importing moment and Popup libraries
import classNames from "classnames";
import moment from "moment";
import Popup from "reactjs-popup";

// Function to capitalize the first letter of each word in a sentence
export const upperFistChar = (text) => {
  let sentence = text?.toLowerCase().split(" ");
  for (let i = 0; i < sentence?.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence?.join(" ");
};

// Function to compare changes made in two objects
export const compareChanges = (a, b) =>
  Object.entries(a).some(([key, value]) => value !== b[key]);

// Function to format DateTime based on timezone
export const formatDateTime = (dateTime) => {
  return moment.utc(dateTime).local().format("DD-MM-YYYY");
};

export const getDateDiff = (time1, time2, isCheckWithNow) => {
  const startDate = moment.utc(time1);
  const timeEnd = moment.utc(time2);
  const diff = timeEnd.diff(startDate);
  const diffDuration = moment.duration(diff);

  const years = diffDuration.years() > 0 ? `${diffDuration.years()} years` : '';
  const months = diffDuration.months() > 0 ? `${diffDuration.months()} months` : '';
  const days = diffDuration.days() > 0 ? `${diffDuration.days()} days` : '';
  const hours = diffDuration.hours() > 0 ? `${diffDuration.hours()} hours` : '';
  const minutes = diffDuration.minutes() > 0 ? `${diffDuration.minutes()} minutes` : '';
  const seconds = diffDuration.seconds() > 0 ? `${diffDuration.seconds()} seconds` : '';

  return `${years} ${months} ${days} ${hours} ${minutes} ${seconds} ${isCheckWithNow ? 'ago' : ''}`;
}

// Function to display the label in shortened form with an ellipsis (...) after a certain length
export const labelDisplay = (text, len): string =>
  text && text.length > len ? text.substring(0, len) + "..." : text;

// Function to display the label in shortened form with an ellipsis (...) after a certain length
export const fileNameDisplay = (text, len): string =>
  text && text.length > len ? text.substring(0, len) + "... .pdf" : text;

// Function that prevents non-numeric inputs in a float input field
export const onInputFloat = (evt) => {
  evt = evt || window.event;
  let charCode = typeof evt.which === "undefined" ? evt.keyCode : evt.which;
  let charStr = String.fromCharCode(charCode);
  let exclude = [
    8, 190, 9, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 45, 46, 35, 40, 34,
    37, 12, 39, 36, 38, 33, 110,
  ];
  if (!charStr.match(/^[0-9]+$/) && !exclude.includes(charCode))
    evt.preventDefault();
};

// Function that prevents form submission when the Enter key is pressed
export const preventPressEnter = (evt) => {
  if (evt.keyCode === 13 || evt.code === "Enter") {
    evt.preventDefault();
  }
};

// Function that prevents non-numeric inputs in a number input field
export const onInputNumber = (evt) => {
  if (evt.keyCode === 13 || evt.code === "Enter") {
    evt.preventDefault();
  }
  if (["e", "E", "+", "-", "ArrowUp", "ArrowDown"].includes(evt.key)) {
    evt.preventDefault();
  }
};

export const onInputTel = (evt) => {
  if (
    ![
      48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102,
      103, 104, 105, 110, 188, 190, 8
    ].includes(evt.keyCode)
  ) {
    evt.preventDefault();
  }
};

// Function that formats long text with a tooltip popup
export const rowFormat = (length, position, data) => {
  return (
    <span>
      {data?.length > length ? (
        <Popup
          trigger={
            <span className="breakText">{labelDisplay(data, length)}</span>
          }
          position={position}
          on="hover"
        >
          <span className="text-break popup">{data}</span>
        </Popup>
      ) : (
        data
      )}
    </span>
  );
};

// Function that displays sort order icons (ascending or descending)
export const sortColum = (order) => {
  if (!order) return null;
  else if (order === "asc")
    return <i style={{ marginLeft: "5px" }} className="fa fa-sort-asc"></i>;
  else if (order === "desc")
    return <i style={{ marginLeft: "5px" }} className="fa fa-sort-desc"></i>;
  return null;
};

// Function that hides part of the text with asterisks (*)
export const hideText = (text, len) => {
  return text ? text.substring(0, len) + "******" : "";
};

// Check if the device is a tablet or iPad
export const isOnTabletOrIpad = () => {
  return /iPad|Android/.test(navigator.userAgent);
};

// Returns the DD - MM -YYY
export const getLocalDate = (dateTime) => {
  return moment.utc(dateTime).local().format("DD-MM-YYYY");
};

const cleanSearchText = (input) => {
  // Pattern to match bullet points, numbers at the start, and colon or period at the end of a sentence
  const regex = /^[\d\s.]*|\.$|:$/g;
  // Remove matched patterns from the input string and trim any leading/trailing whitespace
  return input.replace(regex, '').trim();
}

const charactersLineBreaks = (text, checkSourceText, handleSearch) => {
  if (text.includes('•')) {
    const parts = text.split('•');
    return (
      <span>
        {parts.map((part, index) => {
          if (part) {
            return <>
              <span
                key={index}
                className={classNames('', { 'source-text-item': checkSourceText(part) })}
                onClick={() => checkSourceText(part) && handleSearch(cleanSearchText(part))}
              >
                {index > 0 && <span>•</span>} {part}
              </span>
              {index < parts.length - 1 && <br />}
            </>
          }
        })}
      </span>
    );
  } else {
    return <span
      className={classNames('', { 'source-text-item': checkSourceText(text) })}
      onClick={() => checkSourceText(text) && handleSearch(cleanSearchText(text))}
    >
      {text}
    </span>;
  }
}

const numberlistLineBreaks = (text, checkSourceText, handleSearch) => {
  const regex = /(?<=\s)(?=[ivxlcdm]+\.|[ivxlcdm]+\)|\([a-z]\)|[a-z]\)|[a-z]\.|\d+\.|\d+\))|(?<=\n)(?=\d+\s|[ivxlcdm]+\s|[a-z]\s)/gi;

  const formattedText = text.split(regex).map((segment, index) => (
    <span key={index}>
      {index !== 0 && <br />}
      {charactersLineBreaks(segment, checkSourceText, handleSearch)}
    </span>
  ));

  return <span>{formattedText}</span>;
}

const textWithLineBreaks = (text, checkSourceText, handleSearch) => {
  const sentences = text.split(/(?<=[:])\s*/);

  const formattedText = sentences.map((sentence, index) => {
    if (sentence) {
      return <span key={index}>
        {numberlistLineBreaks(sentence, checkSourceText, handleSearch)}
        {index !== sentences.length - 1 && <br />}
      </span>
    }
  });

  return <span>{formattedText}</span>;
}

export const progressText = (text, checkSourceText, handleSearch) => {
  // Split text by double newlines or dot followed by newline, then map through pieces and separate with <br /> elements
  const paragraphs = text.split(/\n\n/).map((part, index) => (
    <p key={index} className="m-0">
      {part.split(/\n\n/).map((line) =>
        textWithLineBreaks(line, checkSourceText, handleSearch)
      )}
    </p>
  ));

  return paragraphs
};

export const progressTextReadability = (text) => {
  // Split text by double newlines or dot followed by newline, then map through pieces and separate with <br /> elements
  const paragraphs = text.split(/\n/).map((part, index) => (
    <p key={index} className="m-0">
      {part.split(/\n/).map((line, lineIndex) => (
        <p key={lineIndex} className="m-0">
          {line}
        </p>
      ))}
    </p>
  ));

  return paragraphs
};

export const changeFormatComment = (text) => {
  // Define replacements in an array
  const replacements = [
    {
      oldValue: /The model clause sentence/g,
      newValue: '<b><i>The model clause sentence</i></b>',
    },
    {
      oldValue: /The contract sentence/g,
      newValue: '<b><i>The contract sentence</i></b>',
    }
  ];

  let formattedText = text;
  replacements.forEach(element => {
    formattedText = formattedText.replace(element.oldValue, element.newValue)
  })

  return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

export const generatePassword = () => {
  const charSets = {
    upperChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowerChars: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: `!"#$%&'()*+-./:;<=>?[^{}|~]`
  };

  // Randomly pick one character from each type of characters to ensure completeness
  let newPassword = Object.values(charSets).map(
    (chars) => chars[Math.floor(Math.random() * chars.length)]
  ).join('');

  // Fill the rest of the password randomly to at least 8 chars
  while (newPassword.length < 8) {
    const allChars = Object.values(charSets).join('');
    newPassword += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle to avoid predictable patterns
  newPassword = newPassword.split('').sort(() => 0.5 - Math.random()).join('');
  return newPassword
};
