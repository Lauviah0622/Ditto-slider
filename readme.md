# Ditto Slider

Control anything yourself!

## Tech 
- Typescript 
- Sass
- Vite
- Pnpm

## Demo usage 

1. `npm run install`
2. `npm run dev` 

## Component Usage

```ts
interface SlideProps {
  images: string[]
  index: number    
  Container: (
        props: { children: JSX.Element }, 
        ref: React.ForwardedRef<HTMLDivElement>
    ) => JSX.Element;
  Item: (props: { src: string }) => JSX.Element
}
```

### Props of Slide Component
- `images`: Image `src` url string array which you want display.
- `index`: The index of the image which should display at center in images array. 
if index is larger than images length or lower than zero, will auto calculate the appropriate number with length.
- `Container`: Any container component render slider items inside, there's two requirements:
    1. Should have `children` props render the items.
    2. The closest parent DOM element of children should set second argument as `ref` attribute to calculate container size.
- `Item`: Any element, render image item, only one requirements.
    1. Should use `img` element inside which receive `src` string as attribute to render image.