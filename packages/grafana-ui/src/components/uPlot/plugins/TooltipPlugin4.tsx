import { css } from '@emotion/css';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import uPlot from 'uplot';

import { GrafanaTheme2 } from '@grafana/data';

import { useStyles2 } from '../../../themes/ThemeContext';
import { UPlotConfigBuilder } from '../config/UPlotConfigBuilder';

import { getRandomContent } from './utils';

interface TooltipPlugin4Props {
  config: UPlotConfigBuilder;
}

/**
 * @alpha
 */
export const TooltipPlugin4 = ({ config }: TooltipPlugin4Props) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [plot, setPlot] = useState<uPlot>();

  const styleRef = useRef({ transform: '' }); // boo!
  const [isVisible, setVisible] = useState(false);

  const [contents, setContents] = useState(getRandomContent);

  const style = useStyles2(getStyles);

  useLayoutEffect(() => {
    let _isVisible = isVisible;
    let overRect: DOMRect;

    let offsetX = 0;
    let offsetY = 0;
    let width = 0;
    let height = 0;

    let htmlEl = document.documentElement;
    let winWidth = htmlEl.clientWidth - 5;
    let winHeight = htmlEl.clientHeight - 5;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        let rect = entry.target.getBoundingClientRect();

        width = rect.width;
        height = rect.height;
      }
    });

    window.addEventListener('resize', (e) => {
      winWidth = htmlEl.clientWidth - 5;
      winHeight = htmlEl.clientHeight - 5;
    });

    config.addHook('init', (u) => {
      setPlot(u);
    });

    config.addHook('syncRect', (u, rect) => {
      overRect = rect;
    });

    config.addHook('setLegend', (u) => {
      setContents(getRandomContent());
    });

    config.addHook('setCursor', (u) => {
      let { left = -10, top = -10 } = u.cursor;

      if (left < 0 && top < 0) {
        if (_isVisible) {
          setVisible((_isVisible = false));

          // TODO: this should be done by Dashboards onmouseleave
          u.root.closest('.react-grid-item')!.style.zIndex = 'auto';

          // prolly not needed since dom will be destroyed, so this should be GCd
          resizeObserver.unobserve(domRef.current!);
        }
      } else {
        let clientX = overRect.left + left;
        let clientY = overRect.top + top;

        if (offsetY) {
          if (clientY + height < winHeight || clientY - height < 0) {
            offsetY = 0;
          } else if (offsetY !== -height) {
            offsetY = -height;
          }
        } else {
          if (clientY + height > winHeight && clientY - height >= 0) {
            offsetY = -height;
          }
        }

        if (offsetX) {
          if (clientX + width < winWidth || clientX - width < 0) {
            offsetX = 0;
          } else if (offsetX !== -width) {
            offsetX = -width;
          }
        } else {
          if (clientX + width > winWidth && clientX - width >= 0) {
            offsetX = -width;
          }
        }

        const shiftX = offsetX !== 0 ? 'translateX(-100%)' : '';
        const shiftY = offsetY !== 0 ? 'translateY(-100%)' : '';

        // TODO: to a transition only when switching sides
        // transition: transform 100ms;

        const transform = `${shiftX} translateX(${left}px) ${shiftY} translateY(${top}px)`;

        if (_isVisible && domRef.current) {
          domRef.current.style.transform = transform;
        } else {
          styleRef.current = { ...styleRef.current, transform: transform };
          setVisible((_isVisible = true));

          // TODO: this should be done by Dashboards onmouseenter
          u.root.closest('.react-grid-item')!.style.zIndex = '1';

          // boo setTimeout!
          setTimeout(() => {
            resizeObserver.observe(domRef.current!);
          }, 0);
        }
      }
    });
  }, [config]);

  if (plot && isVisible) {
    return createPortal(
      <div className={style.tooltipWrapper} style={styleRef.current} ref={domRef}>
        {contents}
      </div>,
      plot.over
    );
  }

  return null;
};

const getStyles = (theme: GrafanaTheme2) => ({
  tooltipWrapper: css`
    background: ${theme.colors.background.secondary};
    top: 0;
    left: 0;
    pointer-events: none;
    position: absolute;
    z-index: 1;

    padding: 10px;
    white-space: pre;
  `,
});
