import React, { useState } from 'react';
import type { SchemaVersionConfig, SortConfig } from './utils/schema-config';
import {
  DEFAULT_SCHEMA_VERSIONS,
  recalculateRenderIndices,
} from './utils/schema-config';

export const SchemaVersionSortConfig = ({
  config,
  onChange,
}: {
  config: SortConfig;
  onChange: (config: SortConfig) => void;
}) => {
  const [draggedItem, setDraggedItem] = useState<{
    schemaVersion: string;
    sourceArea: 'positive' | 'negative';
    index: number;
  } | null>(null);
  const [newSchemaVersion, setNewSchemaVersion] = useState('');
  const [newSchemaArea, setNewSchemaArea] = useState<'positive' | 'negative'>(
    'positive',
  );

  const handleDragStart = (
    e: React.DragEvent,
    dragInfo: {
      schemaVersion: string;
      area: 'positive' | 'negative';
      index: number;
    },
  ) => {
    setDraggedItem({
      schemaVersion: dragInfo.schemaVersion,
      sourceArea: dragInfo.area,
      index: dragInfo.index,
    });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', ''); // 某些浏览器需要这个
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (
    e: React.DragEvent,
    targetArea: 'positive' | 'negative',
    targetIndex: number,
  ) => {
    e.preventDefault();
    if (!draggedItem) {
      return;
    }

    // 防止拖拽到自己身上（同一位置）
    if (
      draggedItem.sourceArea === targetArea &&
      draggedItem.index === targetIndex
    ) {
      setDraggedItem(null);
      return;
    }

    const newConfig = { ...config };

    if (draggedItem.sourceArea === targetArea) {
      // 同一区域内移动：直接操作同一个数组
      const list = [...newConfig[targetArea]];
      const [removed] = list.splice(draggedItem.index, 1);

      // 如果目标索引大于源索引，需要减1（因为源项已被移除）
      const adjustedIndex =
        targetIndex > draggedItem.index ? targetIndex - 1 : targetIndex;

      // 确保索引在有效范围内
      const finalIndex = Math.max(0, Math.min(adjustedIndex, list.length));
      list.splice(finalIndex, 0, removed);

      newConfig[targetArea] = list;
    } else {
      // 跨区域移动：操作两个不同的数组
      const sourceList = [...newConfig[draggedItem.sourceArea]];
      const targetList = [...newConfig[targetArea]];

      // 从源列表移除
      const [removed] = sourceList.splice(draggedItem.index, 1);

      // 确保目标索引在有效范围内
      const finalIndex = Math.max(0, Math.min(targetIndex, targetList.length));
      targetList.splice(finalIndex, 0, removed);

      newConfig[draggedItem.sourceArea] = sourceList;
      newConfig[targetArea] = targetList;
    }

    // 去重：确保同一个 数据定义版本 在同一个区域内只出现一次
    const deduplicatedConfig: SortConfig = {
      positive: [],
      negative: [],
    };

    // 去重正数区域
    const seenPositive = new Set<string>();
    for (const item of newConfig.positive) {
      if (!seenPositive.has(item.schemaVersion)) {
        seenPositive.add(item.schemaVersion);
        deduplicatedConfig.positive.push(item);
      }
    }

    // 去重负数区域
    const seenNegative = new Set<string>();
    for (const item of newConfig.negative) {
      if (!seenNegative.has(item.schemaVersion)) {
        seenNegative.add(item.schemaVersion);
        deduplicatedConfig.negative.push(item);
      }
    }

    // 重新计算索引并保存
    const recalculated = recalculateRenderIndices(deduplicatedConfig);
    onChange(recalculated);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleAdd = () => {
    if (!newSchemaVersion.trim()) {
      alert('请输入 数据定义版本');
      return;
    }

    // 检查是否已存在
    const existsInPositive = config.positive.some(
      item => item.schemaVersion === newSchemaVersion.trim(),
    );
    const existsInNegative = config.negative.some(
      item => item.schemaVersion === newSchemaVersion.trim(),
    );

    if (existsInPositive || existsInNegative) {
      alert('该 数据定义版本 已存在');
      return;
    }

    const newConfig = { ...config };
    const newItem: SchemaVersionConfig = {
      schemaVersion: newSchemaVersion.trim(),
      renderIndex: newSchemaArea === 'positive' ? 1 : -1,
    };

    if (newSchemaArea === 'positive') {
      newConfig.positive.push(newItem);
    } else {
      newConfig.negative.push(newItem);
    }

    const recalculated = recalculateRenderIndices(newConfig);
    onChange(recalculated);
    setNewSchemaVersion('');
  };

  const handleDelete = (
    schemaVersion: string,
    area: 'positive' | 'negative',
  ) => {
    if (DEFAULT_SCHEMA_VERSIONS.includes(schemaVersion)) {
      alert('默认的 数据定义版本 不能删除');
      return;
    }

    const newConfig = { ...config };
    newConfig[area] = newConfig[area].filter(
      item => item.schemaVersion !== schemaVersion,
    );

    const recalculated = recalculateRenderIndices(newConfig);
    onChange(recalculated);
  };

  const renderItem = (
    item: SchemaVersionConfig,
    area: 'positive' | 'negative',
    index: number,
  ) => {
    const isDefault = DEFAULT_SCHEMA_VERSIONS.includes(item.schemaVersion);
    const isDragging =
      draggedItem?.schemaVersion === item.schemaVersion &&
      draggedItem?.sourceArea === area;

    return (
      <div key={`${area}-${index}`}>
        {/* 拖拽插入区域（在项之前） */}
        <div
          onDragOver={handleDragOver}
          onDrop={e => handleDrop(e, area, index)}
          style={{
            height: '8px',
            marginBottom: '4px',
            borderRadius: '4px',
            background: draggedItem ? 'transparent' : 'transparent',
            transition: 'background 0.2s',
          }}
          onDragEnter={e => {
            if (draggedItem) {
              e.currentTarget.style.background = '#2196f3';
              e.currentTarget.style.height = '4px';
            }
          }}
          onDragLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.height = '8px';
          }}
        />
        <div
          draggable
          onDragStart={e =>
            handleDragStart(e, {
              schemaVersion: item.schemaVersion,
              area,
              index,
            })
          }
          onDragOver={handleDragOver}
          onDrop={e => handleDrop(e, area, index + 1)}
          onDragEnd={handleDragEnd}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px',
            marginBottom: '8px',
            background: isDragging
              ? '#e3f2fd'
              : area === 'positive'
                ? '#f1f8e9'
                : '#fff3e0',
            border: `2px solid ${
              isDragging
                ? '#2196f3'
                : area === 'positive'
                  ? '#8bc34a'
                  : '#ff9800'
            }`,
            borderRadius: '6px',
            cursor: 'move',
            opacity: isDragging ? 0.5 : 1,
            transition: 'all 0.2s',
            overflow: 'hidden',
            wordBreak: 'break-word',
          }}
        >
          <div
            style={{
              fontSize: '18px',
              userSelect: 'none',
              cursor: 'grab',
            }}
          >
            ⋮⋮
          </div>
          <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', wordBreak: 'break-word' }}>
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '14px',
                color: '#333',
                marginBottom: '4px',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {item.schemaVersion}
              {isDefault ? (
                <span
                  style={{
                    marginLeft: '8px',
                    fontSize: '12px',
                    color: '#666',
                    fontWeight: 'normal',
                  }}
                >
                  (默认)
                </span>
              ) : null}
            </div>
            <div
              style={{
                fontSize: '12px',
                color: '#666',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              渲染索引: {item.renderIndex}
            </div>
          </div>
          <button
            onClick={() => handleDelete(item.schemaVersion, area)}
            disabled={isDefault}
            style={{
              padding: '4px 8px',
              background: isDefault ? '#f5f5f5' : '#ff4d4f',
              color: isDefault ? '#999' : 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isDefault ? 'not-allowed' : 'pointer',
              fontSize: '12px',
              opacity: isDefault ? 0.5 : 1,
            }}
            title={isDefault ? '默认项不能删除' : '删除'}
          >
            删除
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <p
        style={{
          margin: '0 0 20px 0',
          color: '#666',
          fontSize: '13px',
        }}
      >
        拖拽数据定义版本项目调整渲染顺序
      </p>

      {/* 添加新项 */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
          padding: '8px',
          background: '#f8f9fa',
          borderRadius: '6px',
        }}
      >
        <input
          type="text"
          value={newSchemaVersion}
          onChange={e => setNewSchemaVersion(e.target.value)}
          placeholder="输入 数据定义版本"
          style={{
            flex: 1,
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              handleAdd();
            }
          }}
        />
        <select
          value={newSchemaArea}
          onChange={e =>
            setNewSchemaArea(e.target.value as 'positive' | 'negative')
          }
          style={{
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          <option value="positive">最终回答前渲染</option>
          <option value="negative">最终回答后渲染</option>
        </select>
        <button
          onClick={handleAdd}
          style={{
            padding: '8px 16px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          添加
        </button>
      </div>

      {/* 两个区域 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          width: '100%',
          height: '100%',
          minHeight: '400px',
        }}
      >
        {/* 最终回答前渲染 */}
        <div
          style={{
            width: '100%',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px',
              padding: '6px',
              background: '#e8f5e9',
              borderRadius: '6px',
            }}
          >
            <span style={{ fontSize: '16px' }}>✅</span>
            <span
              style={{
                fontWeight: 'bold',
                color: '#2e7d32',
                fontSize: '14px',
              }}
            >
              最终回答前渲染
            </span>
          </div>
          <div
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, 'positive', config.positive.length)}
            style={{
              flex: 1,
              minHeight: '100px',
              padding: '8px',
              background: '#f1f8e9',
              borderRadius: '6px',
              border: '2px dashed #8bc34a',
              overflowY: 'auto',
            }}
          >
            {config.positive.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  color: '#999',
                  fontSize: '13px',
                  padding: '12px',
                }}
              >
                最终回答前渲染
              </div>
            ) : (
              [...config.positive]
                .sort((a, b) => b.renderIndex - a.renderIndex) // renderIndex 越大越靠上
                .map(item => {
                  // 查找原始数组中的索引，用于拖拽操作
                  const originalIndex = config.positive.findIndex(
                    origItem => origItem.schemaVersion === item.schemaVersion,
                  );
                  return renderItem(item, 'positive', originalIndex);
                })
            )}
          </div>
        </div>

        {/* 最终回答后渲染 */}
        <div
          style={{
            width: '100%',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px',
              padding: '6px',
              background: '#fff3e0',
              borderRadius: '6px',
            }}
          >
            <span style={{ fontSize: '16px' }}>⏳</span>
            <span
              style={{
                fontWeight: 'bold',
                color: '#e65100',
                fontSize: '14px',
              }}
            >
              最终回答后渲染
            </span>
          </div>
          <div
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, 'negative', config.negative.length)}
            style={{
              flex: 1,
              minHeight: '100px',
              padding: '8px',
              background: '#fff3e0',
              borderRadius: '6px',
              border: '2px dashed #ff9800',
              overflowY: 'auto',
            }}
          >
            {config.negative.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  color: '#999',
                  fontSize: '13px',
                  padding: '12px',
                }}
              >
                最终回答后渲染
              </div>
            ) : (
              config.negative.map((item, index) =>
                renderItem(item, 'negative', index),
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

