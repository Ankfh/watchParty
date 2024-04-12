import React from 'react';
import {
  DropdownProps,
  Menu,
  Input,
  Icon,
  Dropdown,
  Form,
} from 'semantic-ui-react';
import {
  debounce,
  getMediaPathResults,
  getYouTubeResults,
  isHttp,
  isMagnet,
  isYouTube,
} from '../../utils';
import { examples } from '../../utils/examples';
import ChatVideoCard from '../Playlist/ChatVideoCard';
import styles from './comBox.module.css';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import { MuiLibraryAddOutlinedIcon } from './MuiStyle';
import CellTowerIcon from '@mui/icons-material/CellTower';
interface ComboBoxProps {
  roomSetMedia: (e: any, data: DropdownProps) => void;
  playlistAdd: (e: any, data: DropdownProps) => void;
  playlistMove: (index: number, toIndex: number) => void;
  playlistDelete: (index: number) => void;
  roomMedia: string;
  getMediaDisplayName: (input: string) => string;
  launchMultiSelect: (multi: []) => void;
  mediaPath: string | undefined;
  disabled?: boolean;
  playlist: PlaylistVideo[];
}

export class ComboBox extends React.Component<ComboBoxProps> {
  state = {
    inputMedia: undefined as string | undefined,
    results: undefined as JSX.Element[] | undefined,
    loading: false,
    lastResultTimestamp: Number(new Date()),
  };
  debounced: any = null;

  setMediaAndClose = (e: any, data: DropdownProps) => {
    window.setTimeout(
      () => this.setState({ inputMedia: undefined, results: undefined }),
      200,
    );
    this.props.roomSetMedia(e, data);
  };

  doSearch = async (e: any) => {
    e.persist();
    this.setState({ inputMedia: e.target.value }, () => {
      if (!this.debounced) {
        this.debounced = debounce(async () => {
          this.setState({ loading: true });
          const query: string = this.state.inputMedia || '';
          let timestamp = Number(new Date());
          let results: JSX.Element[] | undefined = undefined;
          if (
            query === '' ||
            // Anything that doesn't pass this check we pass to YouTube as a search query
            (query && (isHttp(query) || isMagnet(query)))
          ) {
            let items = examples;
            if (!this.state.inputMedia && this.props.mediaPath) {
              items = await getMediaPathResults(this.props.mediaPath, '');
            }
            if (query) {
              let type = 'file';
              if (isYouTube(query)) {
                type = 'youtube';
              }
              if (isMagnet(query)) {
                type = 'magnet';
              }
              items = [
                {
                  name: query,
                  type,
                  url: query,
                  duration: 0,
                },
              ];
            }
            results = items.map((result: SearchResult, index: number) => (
              <Menu.Item
                style={{ padding: '2px', color: 'white' }}
                key={result.url}
                onClick={(e: any) =>
                  this.setMediaAndClose(e, { value: result.url })
                }
              >
                <ChatVideoCard
                  video={result}
                  index={index}
                  onPlaylistAdd={this.props.playlistAdd}
                />
              </Menu.Item>
            ));
          } else {
            const data = await getYouTubeResults(query);
            results = data.map((result, index) => {
              return (
                <Menu.Item
                  key={result.url}
                  onClick={(e: any) =>
                    this.setMediaAndClose(e, { value: result.url })
                  }
                >
                  <ChatVideoCard
                    video={result}
                    index={index}
                    onPlaylistAdd={this.props.playlistAdd}
                  />
                </Menu.Item>
              );
            });
          }
          if (timestamp > this.state.lastResultTimestamp) {
            this.setState({
              loading: false,
              results,
              lastResultTimestamp: timestamp,
            });
          }
        }, 500);
      }
      this.debounced();
    });
  };
  render() {
    const { roomMedia: currentMedia, getMediaDisplayName } = this.props;
    const { results } = this.state;
    return (
      <div style={{ position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            gap: '4px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              paddingRight: '4px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <a href="/" style={{ display: 'flex' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',

                  marginLeft: 10,
                }}
              >
                <div
                  style={{
                    // textTransform: 'uppercase',
                    fontWeight: 700,
                    color: 'white',
                    fontSize: '30px',
                    lineHeight: '30px',
                  }}
                >
                  en
                </div>
                <div
                  style={{
                    // textTransform: 'uppercase',
                    fontWeight: 700,
                    color: 'yellow',
                    fontSize: '30px',
                    lineHeight: '30px',
                    marginLeft: 'auto',
                  }}
                >
                  Sync
                </div>
              </div>
            </a>
          </div>
          <Form style={{ flexGrow: 1 }} autoComplete="off">
            <input
              className={styles.inputWrapper} // Apply the CSS module class
              disabled={this.props.disabled}
              onChange={this.doSearch}
              onFocus={(e) => {
                e.persist();
                this.setState(
                  {
                    inputMedia:
                      isHttp(currentMedia) || isMagnet(currentMedia)
                        ? currentMedia
                        : getMediaDisplayName(currentMedia),
                  },
                  () => {
                    if (
                      !this.state.inputMedia ||
                      (this.state.inputMedia &&
                        (isHttp(this.state.inputMedia) ||
                          isMagnet(this.state.inputMedia)))
                    ) {
                      this.doSearch(e);
                    }
                  },
                );
                setTimeout(() => e.target.select(), 100);
              }}
              onBlur={() => {
                setTimeout(() => {
                  this.setState({
                    inputMedia: undefined,
                    results: undefined,
                  });
                }, 200);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  this.setMediaAndClose(e, {
                    value: this.state.inputMedia,
                  });
                }
              }}
              // loading={this.state.loading}
              placeholder="Enter video file URL, magnet link, YouTube link, or YouTube search term"
              value={
                this.state.inputMedia !== undefined
                  ? this.state.inputMedia
                  : getMediaDisplayName(currentMedia)
              }
            />
          </Form>
          <Dropdown
            icon={<VideoLibraryOutlinedIcon fontSize="large" />}
            // labeled
            className="grey"
            button
            style={{ backgroundColor: '#222222' }}
            // text={`Playlist (${this.props.playlist.length})`}
            scrolling
          >
            <Dropdown.Menu direction="left">
              {this.props.playlist.length === 0 && (
                <Dropdown.Item disabled>
                  There are no items in the playlist.
                </Dropdown.Item>
              )}
              {this.props.playlist.map((item: PlaylistVideo, index: number) => {
                if (Boolean(item.img)) {
                  item.type = 'youtube';
                }
                return (
                  <Dropdown.Item>
                    <div style={{ maxWidth: '500px' }}>
                      <ChatVideoCard
                        video={item}
                        index={index}
                        controls
                        onPlay={(index) => {
                          this.props.roomSetMedia(null, {
                            value: this.props.playlist[index]?.url,
                          });
                          this.props.playlistDelete(index);
                        }}
                        onPlayNext={(index) => {
                          this.props.playlistMove(index, 0);
                        }}
                        onRemove={(index) => {
                          this.props.playlistDelete(index);
                        }}
                        disabled={this.props.disabled}
                      />
                    </div>
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <div
            style={{
              // paddingRight: 'px',
              gap: '34px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div>
              <CellTowerIcon style={{ color: 'white' }} fontSize="large" />
            </div>
            <div>
              <MuiLibraryAddOutlinedIcon fontSize="large" />
            </div>
          </div>
        </div>
        {Boolean(results) && this.state.inputMedia !== undefined && (
          <Menu
            fluid
            vertical
            className=""
            style={{
              position: 'absolute',
              top: '22px',
              maxHeight: '250px',
              overflow: 'scroll',
              zIndex: 1001,
              background: '#3d403f',
              color: 'white',
            }}
          >
            {results}
          </Menu>
        )}
      </div>
    );
  }
}
