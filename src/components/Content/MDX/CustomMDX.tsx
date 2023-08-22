import React from 'react';
import { MDXComponents } from 'mdx/types';
import { Footer } from '@/components/Layout';
import {
  CodeBlock, Image, Message, Q, Youtube
} from '../Post';
import {
  A, Code, H, P
} from '@/components/Base';

/** 여기에 필요한 항목들을 넣는다. */
export const CustomMDX: MDXComponents = {
  h1: (props) => (
    <H level='h2' type='post'>{props.children}</H>
  ),
  h2: (props) => (
    <H level='h3' type='post'>{props.children}</H>
  ),
  h3: (props) => (
    <H level='h4' type='post'>{props.children}</H>
  ),
  h4: (props) => (
    <H level='h5' type='post'>{props.children}</H>
  ),
  h5: (props) => (
    <H level='h6' type='post'>{props.children}</H>
  ),
  p: (props) => (
    <P>{props.children}</P>
  ),
  code: (props) => (
    <Code>{props.children}</Code>
  ),
  a: (props) => (
    <A href={props.href} type='post' label={props.children as string}>{props.children}</A>
  ),
  img: (props) => (
    <Image src={props.src} alt={props.alt} />
  ),
  A,
  Footer,
  CodeBlock,
  Message,
  Youtube,
  Q,
};
