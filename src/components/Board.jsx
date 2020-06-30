import React, { Component } from "react";
import "./Board.css";

class Square extends Component
{
    getText(val)
    {
        if (val !== null)
            return val ? 'O' : 'X'
        return val;
    }

    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                { this.getText(this.props.value) }
            </button>
        );
    }
}

export default class Board extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            map: [],
            status: false
        };

        for (let y = 0; y < 3; y++)
            this.state.map.push([null, null, null]);
    }
    
    calcWin()
    {
        let m = this.state.map;

        const check = (prev, c, y, x, ydir, xdir) => {
            if (c == m.length)
                return true;

            if (ydir + xdir !== 0)
            {
                let ny = y + ydir;
                let nx = x + xdir;
                if (ny < 0 || ny > 2 || nx < 0 || nx > 2 || prev !== m[ny][nx])
                    return false;
                return check(prev, c + 1, ny, nx, ydir, xdir);
            }
            return false;
        }

        for (let y = 0; y < m.length; y++)
            for (let x = 0; x < m.length; x++)
                for (let yy = -1; yy <= 1; yy++)
                    for (let xx = -1; xx <= 1; xx++)
                        if (m[y][x] !== null && check(m[y][x], 1, y, x, yy, xx))
                            return m[y][x];

    }

    squareClick(y, x)
    {
        if (this.state.map[y][x] === null)
        {
            this.state.map[y][x] = this.state.status;
            this.setState({ map: this.state.map, status: !this.state.status });
            console.log(this.calcWin());
        }
    }

    render()
    {
        return (
            <div>
                <div className="status">Next player: {this.state.status ? 'O' : 'X'}</div>

                {this.state.map.map((y, yy) => 
                    <div className="board-row" key={yy}>
                        {y.map((x, xx) => 
                            <Square value={x} key={xx} onClick={() => {this.squareClick(yy, xx)}} />
                        )}
                    </div>
                )}
            </div>
        );
    }
}
